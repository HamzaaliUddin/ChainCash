import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { user, params } = request.body;
        const axiosResponse = await axios.post(
            `https://api.iugu.com/v1/accounts/configuration?api_token=${user?.iuguSubaccount?.user_token}`,
            { params }
        );

        return response.status(200).json({ iuguSubAccount: axiosResponse.data });
    } catch (error) {
        console.error('Error configure sub-account:', error);
        return response.json({ error: 'Error configure sub-account' }, { status: 500 });
    }
}
