import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { iuguReceiver, iuguAmmount, user } = request.body;
        const axiosResponse = await axios.post(
            `https://api.iugu.com/v1/transfers?api_token=${user?.iuguSubaccount?.user_token}`,
            { receiver_id: iuguReceiver, amount_cents: Number(iuguAmmount) * 100, api_token: user?.iuguSubaccount?.user_token }
        );

        return response.status(200).json({ iuguSubAccount: axiosResponse.data });
    } catch (error: any) {
        console.error('Error creating sub-account:', error?.response?.data);
        return response.status(500).json({ error: error?.response?.data?.message || error?.response?.data?.errors || Object.values(error?.response?.data?.message).join(",") || error?.message || 'Error creating sub-account' });
    }
}
