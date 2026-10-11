import express from "express";
import { PreInterviewBody } from "../types";
import cors from "cors";
import { scrapeGithub, scrapeLinkedin } from "./utils/scrappers";
import { prisma } from "./lib/prisma";
import axios from "axios";
import { OpenRouter } from "@openrouter/sdk";

const app = express();
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
        githubRes = scrapeGithub(github);
        linkedinRes = await scrapeLinkedin(linkedin);
        // console.log(githubRes);

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


app.post("/tts", async (req, res) => {
    const client = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY as string,
        httpReferer: 'localhost',
        appTitle: 'Syra-AI',
    });

    try {
        const { text } = req.body;

        const stream = await client.tts.createSpeech({
            speechRequest: {
                model: "deepgram/flux-tts:free",
                input: text as string,
                voice: "flux-alexis-en",
                responseFormat: "mp3",
            },
            appCategories: "text-to-speech",
        });

        const reader = stream.getReader();
        const chunks: Uint8Array[] = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
        const buffer = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
            buffer.set(chunk, offset);
            offset += chunk.length;
        }



        res.send(buffer);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "TTS generation failed"
        });

    }
});

export default app;