// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req: any, res: any) {

    if (req.method === "GET") {
        try {
            const headers = new Headers();
            const appId = process.env.NEXT_PUBLIC_APP_ID;

            if (appId) {
                headers.append("Authorization", appId);
            } else {
                throw new Error("NEXT_PUBLIC_APP_ID environment variable is not defined.");
            }

            headers.append("Content-Type", "application/json");

            const options = {
                method: "GET",
                hostname: "api.openpix.com.br",
                port: null,
                path: `openpix`,
                headers: headers,
            };
            fetch(`https://${options.hostname}/${options.path}/testing?transactionID=${req.query.id}`, options)
                .then((r) => r.text())
                .then((data) => console.log(data));
            res.status(200).json({ status: "Paid" });
        } catch (error: any) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
