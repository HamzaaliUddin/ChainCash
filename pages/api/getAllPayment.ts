import axios from "axios";

export default async function handler(req: any, res: any) {
    try {
        const response = await axios.get(`https://api.openpix.com.br/api/v1/payment`, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_APP_ID,
            },
        });

        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.error("Error:", error);
        res.status(error.response?.status || 500).json({ error: "Internal Server Error" });
    }
}
