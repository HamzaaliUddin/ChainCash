// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const usdPrice = await axios
        .get(`https://www.kucoin.com/_api/currency/prices?base=BRL&targets=${req.query.coin}&lang=en_US`)
        .then((r) => r.data);

    res.status(200).json({ name: Number(usdPrice.data[req.query.coin as string] || "0") })
}
