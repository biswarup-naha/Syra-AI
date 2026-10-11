import axios from "axios";
import { userNameparser } from "./userNameParser";


export const scrapeGithub = async (githubUrl: string) => {
    const githubUserName = userNameparser(githubUrl);
    const ghRepos = await axios.get(`https://api.github.com/users/${githubUserName}/repos`);
    const githubRes = ghRepos.data.map((x: any) => ({
        description: x.description,
        name: x.name,
        fullName: x.full_name,
        stars: x.stargazers_count,
    }));
    return githubRes;
}

export const scrapeLinkedin = async (linkeidnUrl: string) => {
    const linkedinRes = null;
    return linkedinRes;
}