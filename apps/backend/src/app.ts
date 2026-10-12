import express from "express";
import { PreInterviewBody } from "../types";
import cors from "cors";
import { scrapeGithub, scrapeLinkedin } from "./utils/scrappers";
import { prisma } from "./lib/prisma";
import axios from "axios";
import { OpenRouter } from "@openrouter/sdk";

const app = express();
app.use(express.text({ type: ["application/sdp", "text/plain"] }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.get("/api/v1/health", (req, res) => res.status(200).json({ message: "Server is running healthy" }));

app.post("/api/v1/pre-interview", async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect body"
        });
    }

    const { github, linkedin } = data;

    let githubRes: unknown;
    let linkedinRes: unknown;
    let interview: unknown;

    try {
        githubRes = await scrapeGithub(github);
        linkedinRes = await scrapeLinkedin(linkedin);

        interview = await prisma.interview.create({
            data: {
                githubMetadata: JSON.stringify(githubRes),
                status: "PENDING",
            }
        });
    } catch (error) {
        console.log(error);
        interview = { error: error instanceof Error ? error.message : error };
        githubRes = { error: error instanceof Error ? error.message : error };
        linkedinRes = { error: error instanceof Error ? error.message : error };
    }


    return res.status(200).json({
        message: "received",
        interview,
        // github: githubRes,
        // linkedin: linkedinRes
    })
});

app.post("/api/v1/session", async (req, res) => {
    try {
        const { text } = req.body;

        if (typeof text !== "string" || !text.trim()) {
            res.status(400).json({ error: "Text is required" });
            return;
        }

        const client = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY as string,
            httpReferer: "http://localhost:5173",
            appTitle: "Syra-AI",
        });

        const stream = await client.tts.createSpeech({
            speechRequest: {
                model: "fish-audio/s2.1-pro-free:free",
                input: text,
                responseFormat: "mp3",
            },
            appCategories: "text-to-speech",
        });

        const reader = stream.getReader();
        const chunks: Uint8Array[] = [];

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
        } finally {
            reader.releaseLock();
        }

        const audio = Buffer.concat(
            chunks.map((chunk) => Buffer.from(chunk))
        );

        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Length", audio.length);
        res.status(200).send(audio);
    } catch (error) {
        console.error("TTS generation failed:", error);

        res.status(500).json({
            error: "TTS generation failed",
        });
    }
});

export default app;