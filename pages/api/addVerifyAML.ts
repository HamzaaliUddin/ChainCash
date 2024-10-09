// pages/api/chainalysis.js
import axios from "axios";

export default async function handler(req: any, res: any) {
    const { address } = req.body;

    try {
        const response = await axios.post(
            "https://api.chainalysis.com/api/risk/v2/entities",
            { address },
            {
                headers: {
                    Token: process.env.NEXT_PUBLIC_CHAINALYSIS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.error("Error making Chainalysis API request:", error.response.data);
        res.status(error.response.status).json({ error: "Request failed" });
    }
}
