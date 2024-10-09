import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { user } = await request.body;
        const axiosResponse = await axios.get(
            `https://api.iugu.com/v1/accounts/${user?.iuguSubaccount?.account_id}?api_token=${user?.iuguSubaccount?.user_token}`,
        );

        return response.status(200).json({ iuguSubAccount: axiosResponse.data });
    } catch (error) {
        console.error('Error creating sub-account:', error);
        return response.json({ error: 'Error creating sub-account' }, { status: 500 });
    }
}
