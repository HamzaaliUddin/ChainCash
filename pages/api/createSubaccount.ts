import axios from 'axios';

export default async function handler(request: any, response: any) {
    try {
        const { user } = request.body;
        const axiosResponse = await axios.post(
            `https://api.iugu.com/v1/marketplace/create_account?api_token=${process.env.NEXT_PUBLIC_IUGU_PIX_KEY}`,
            { name: user.userName }
        );

        return response.status(200).json({ iuguSubAccount: axiosResponse.data });
    } catch (error) {
        console.error('Error creating sub-account:', error);
        return response.json({ error: 'Error creating sub-account' }, { status: 500 });
    }
}
