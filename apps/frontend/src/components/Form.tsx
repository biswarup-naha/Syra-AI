import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner"
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

const Form = () => {
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");


    async function onSubmit() {
        if (!github || !linkedin) {
            toast.error("Please provide valid profile URLs");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/pre-interview`, {
                github,
                linkedin,
            });

            toast.success("Data sent");
            setGithub("");
            setLinkedin("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send data");
        }
    }

    return (
        <div className="container h-screen w-screen flex justify-center items-center">
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Syra AI interview</h2>
                <div className="p-4">
                    <Input value={github}  placeholder="Enter Github URL" onChange={e => setGithub(e.target.value)} />
                </div>
                <div className="p-4">
                    <Input value={linkedin} placeholder="Enter LinkedIn URL" onChange={e => setLinkedin(e.target.value)} />
                </div>
                <div className="flex justify-center p-4">
                    <Button onClick={onSubmit}>Start interview</Button>
                </div>
            </div>
        </div>
    )
}

export default Form