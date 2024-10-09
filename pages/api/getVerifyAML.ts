// pages/api/chainalysis.js
import axios from "axios";

export default async function handler(req: any, res: any) {
    const { wallet } = req.query;

    try {
        const response = await axios.get(`https://api.chainalysis.com/api/risk/v2/entities/${wallet}`, {
            headers: {
                Token: process.env.NEXT_PUBLIC_CHAINALYSIS_API_KEY,
                "Content-Type": "application/json",
            },
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        console.error("Error fetching data from Chainalysis API:", error);
        res.status(404).json({ error: "Not Found" });
    }
}
