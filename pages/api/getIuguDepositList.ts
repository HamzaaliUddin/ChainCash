import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { apiKey } = request.body;
        const axiosResponse = await axios.get(
            `https://api.iugu.com/v1/deposits?api_token=${apiKey}`
        );

        return response.status(200).json({ iuguDepositList: axiosResponse.data });
    } catch (error: any) {
        console.error('Error:', error?.response?.data);
        return response.status(500).json({ error: Object.values(error?.response?.data?.message).join(",") || error?.response?.data?.message || error?.message || 'Error creating sub-account' });
    }
}
