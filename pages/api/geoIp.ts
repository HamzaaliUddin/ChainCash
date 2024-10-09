import axios from 'axios';

export default async function handler(req: any, res: any) {
    try {
        const geoData = await axios.get(`https://api.ipdata.co/?api-key=82521dc0ecf33753c9e40c3e032a4dab505ba43fa9e9403e1647bb38`).then(r => r.data);
        res.status(200).json(geoData);
    } catch (error) {
        console.log(error)
    }
}
