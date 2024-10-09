// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req: any, res: any) {

    if (req.method === "POST") {
        try {
            console.log(req.body);
            res.send("OK")
        } catch (error: any) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
