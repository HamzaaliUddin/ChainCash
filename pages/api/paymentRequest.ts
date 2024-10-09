export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        try {
            const headers = new Headers();
            const appId = process.env.NEXT_PUBLIC_APP_ID;

            if (appId) {
                headers.append("Authorization", appId);
            } else {
                throw new Error("NEXT_PUBLIC_APP_ID environment variable is not defined.");
            }

            headers.append("Content-Type", "application/json");

            const apiResponse = await fetch("https://api.openpix.com.br/api/v1/payment", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(req.body),
            });
            const data = await apiResponse.json();
            res.status(apiResponse.status).json(data);
        } catch (error: any) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
