// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
// const crypto = require("crypto");

type Data = {
    status: string
}

// const productionKey = `-----BEGIN PUBLIC KEY-----
// MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0+6wd9OJQpK60ZI7qnZG
// jjQ0wNFUHfRv85Tdyek8+ahlg1Ph8uhwl4N6DZw5LwLXhNjzAbQ8LGPxt36RUZl5
// YlxTru0jZNKx5lslR+H4i936A4pKBjgiMmSkVwXD9HcfKHTp70GQ812+J0Fvti/v
// 4nrrUpc011Wo4F6omt1QcYsi4GTI5OsEbeKQ24BtUd6Z1Nm/EP7PfPxeb4CP8KOH
// clM8K7OwBUfWrip8Ptljjz9BNOZUF94iyjJ/BIzGJjyCntho64ehpUYP8UJykLVd
// CGcu7sVYWnknf1ZGLuqqZQt4qt7cUUhFGielssZP9N9x7wzaAIFcT3yQ+ELDu1SZ
// dE4lZsf2uMyfj58V8GDOLLE233+LRsRbJ083x+e2mW5BdAGtGgQBusFfnmv5Bxqd
// HgS55hsna5725/44tvxll261TgQvjGrTxwe7e5Ia3d2Syc+e89mXQaI/+cZnylNP
// SwCCvx8mOM847T0XkVRX3ZrwXtHIA25uKsPJzUtksDnAowB91j7RJkjXxJcz3Vh1
// 4k182UFOTPRW9jzdWNSyWQGl/vpe9oQ4c2Ly15+/toBo4YXJeDdDnZ5c/O+KKadc
// IMPBpnPrH/0O97uMPuED+nI6ISGOTMLZo35xJ96gPBwyG5s2QxIkKPXIrhgcgUnk
// tSM7QYNhlftT4/yVvYnk0YcCAwEAAQ==
// -----END PUBLIC KEY-----
// `;

// const devKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw+fZuC+0vDYTf8fYnCN6
// 71iHg98lPHBmafmqZqb+TUexn9sH6qNIBZ5SgYFxFK6dYXIuJ5uoORzihREvZVZP
// 8DphdeKOMUrMr6b+Cchb2qS8qz8WS7xtyLU9GnBn6M5mWfjkjQr1jbilH15Zvcpz
// ECC8aPUAy2EbHpnr10if2IHkIAWLYD+0khpCjpWtsfuX+LxqzlqQVW9xc6z7tshK
// eCSEa6Oh8+ia7Zlu0b+2xmy2Arb6xGl+s+Rnof4lsq9tZS6f03huc+XVTmd6H2We
// WxFMfGyDCX2akEg2aAvx7231/6S0vBFGiX0C+3GbXlieHDplLGoODHUt5hxbPJnK
// IwIDAQAB
// -----END PUBLIC KEY-----`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    console.log(req.body, req.headers['x-webhook-secret']);
    // const message = JSON.stringify(req.body);
    // const signature = req.headers["fireblocks-signature"];

    // const verifier = crypto.createVerify('RSA-SHA512');
    // verifier.write(message);
    // verifier.end();

    // const isVerified = verifier.verify(devKey, signature, "base64");
    // console.log("Verified:", isVerified);




    const { type, data } = req.body;
    console.log(req.body)

    if (type === "TRANSACTION_CREATED" || type === "TRANSACTION_STATUS_UPDATED") {
        const { status, txHash, operation, destination, amountInfo } = data;
        if (status === "COMPLETED" && operation === "TRANSFER" && destination.type === 'VAULT_ACCOUNT') {
            console.log(txHash);
            console.log(destination);
            console.log(amountInfo);
            const tx = await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/createTransaction`, {
                    assetId: "MATIC_POLYGON",
                    amount: "0.02",
                    srcId: "16",
                    address: "0x3870B58aB7E8FEc15B5dFD29032928d81801CC7e",
                    note: "Transaction Successfully Sent!",
                })
                .then((res) => res?.data);
            console.log(tx)
        }
    }

    res.status(200).json({ status: 'ok' })
}
