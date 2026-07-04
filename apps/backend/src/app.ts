import express from "express";
import { PreInterviewBody } from "../types";
import cors from "cors";
import { scrapeGithub, scrapeLinkedin } from "./utils/scrappers";
import {prisma} from "./lib/prisma";

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

export default app;