import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { user, data } = await request.body;
        const axiosResponse = await axios.post(
            `https://api.iugu.com/v1/accounts/${user?.iuguSubaccount?.account_id}/request_verification?api_token=${user?.iuguSubaccount?.user_token}`, {
            data
        }
        );

        return response.status(200).json({ iuguSubAccount: axiosResponse.data });
    } catch (error: any) {
        console.error('Error verification sub-account:', error?.response?.data);
        return response.json({ error: `Error verification sub-account` }, { status: 500 });
    }
}
