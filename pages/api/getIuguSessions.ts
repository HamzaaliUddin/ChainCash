export default async function handler(req: any, res: any) {
    try {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        let start = 0;
        let url = `https://api.iugu.com/v1/invoices?limit=100&api_token=${process.env.IUGU_PIX_KEY}`;
        let sessions = [];
        const initialData = await fetch(url, options)
            .then(response => response.json())

        sessions = initialData.items
        start += initialData.items.length


        while (start <= initialData.totalItems) {
            const { items } = await fetch(`${url}&start=${start}`, options)
                .then(response => response.json())
            sessions = [...sessions, ...items]
            start += items.length

            if (items.length <= 0) break;
        };



        res.status(200).json(sessions)


    } catch (error: any) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}