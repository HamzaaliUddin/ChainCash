const requestIP = require('request-ip');
const geoIp2 = require('geoip-lite2');

export default async function handler(req: any, res: any) {
    try {
        const ip = requestIP.getClientIp(req);
        const data = await geoIp2.lookup(ip);

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(400).json({ error: "Internal Server Error" })
        }


    } catch (error: any) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}