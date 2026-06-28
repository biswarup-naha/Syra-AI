import express from "express";
import { PreInterviewBody } from "./types";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.post("/api/v1/pre-interview", async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect body"
        });
    }

    const { github, linkedin } = data;
    const githubUserName = github.split("/").filter(x => x != "").pop()
    const linkeidnUserName = linkedin.split("/").filter(x => x != "").pop()

    const ghRepos = await axios
        .get(`https://api.github.com/users/${githubUserName}/repos`);
    const filteredGhRepos = ghRepos.data.map((x: any) => ({
        description: x.description,
        name: x.name,
        fullName: x.full_name,
        stars: x.stargazers_count,
    }));
    console.log(filteredGhRepos);

    return res.status(200).json({
        message: "received"
    })
});

app.listen(5000, () => {
    console.log("server on 5000")
});