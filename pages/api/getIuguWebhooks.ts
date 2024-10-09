import getUsers from "./getUsers";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export default async function handler(req: any, res: any) {
    try {
        const { event, data } = req.body;
        console.log(req.body);

        if (event === "deposit.pix_status_changed") {
            const emailData: EmailData = {
                ...data,
                amount: (Number(data.amount_cents) / 100).toString(),
            }


            const users = await getUsers();
            const user: any = users?.find((user: any) => user?.iuguSubAccouunt?.account_id === data.account_id);

            if (!!user && user?.email) {
                const data = await sendMail(user?.email, emailData);
                res.json(data);
            }

        }
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}


async function sendMail(to: string, data: EmailData) {
    try {
        const msg = {
            to: to, // Change to your recipient
            from: { name: "Chain Cash", email: "chaincashdev@gmail.com" }, // Change to your verified sender
            subject: "Chain Cash",
            templateId: "d-4fd3bc4b077142f49946083c1f48ce31",
            dynamicTemplateData: data,
        };
        await sgMail.send(msg).then(() => {
            console.log("Email sent");
        });
        return ({ msg: msg });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}


interface EmailData {
    sender_ispb: string;
    sender_compe: string;
    sender_bank_name: string;
    sender_bank_branch: string;
    sender_bank_account: string;
    sender_name: string;
    sender_cpf_cnpj: string;
    receiver_ispb: string;
    receiver_compe: string;
    receiver_bank_name: string;
    receiver_bank_branch: string;
    receiver_bank_account: string;
    receiver_name: string;
    receiver_cpf_cnpj: string;
    status: string;
    amount: string;
    statement_identifier: string;
    description: string;
    transfered_at: string;
}

























// List events
// const options = { method: 'GET', headers: { accept: 'application/json' } };
// fetch('https://api.iugu.com/v1/web_hooks/supported_events?api_token='+process.env.IUGU_PIX_KEY, options)
//     .then(response => response.json())
//     .then(events => {
//         events.forEach((event: string) => {
//             console.log(event);

//         })
//     })
//     .catch(err => console.error(err));


// List triggers
// fetch('https://api.iugu.com/v1/web_hooks?api_token='+process.env.IUGU_PIX_KEY, options)
//     .then(response => response.json())
//     .then(events => {
//         events.forEach((event: any) => {
//             const { id } = event;
// })
// })
// .catch(err => console.error(err));

// DELETE trigger
// let options = {
//     method: 'DELETE',
//     headers: { accept: 'application/json', 'content-type': 'application/json' },
// };

// fetch(`https://api.iugu.com/v1/web_hooks/${id}?api_token=`+process.env.IUGU_PIX_KEY, options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


// Create trigger
// let options = {
//     method: 'POST',
//     headers: { accept: 'application/json', 'content-type': 'application/json' },
//     body: JSON.stringify({ url: 'https://196e-103-31-100-11.ngrok-free.app/api/getIuguWebhooks', event: 'all' })
// };

// fetch('https://api.iugu.com/v1/web_hooks?api_token='+process.env.IUGU_PIX_KEY, options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));