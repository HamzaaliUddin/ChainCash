import pinataSdk from "@pinata/sdk";
import multer from 'multer';

const storageConfig = multer.memoryStorage();
const upload = multer({ storage: storageConfig });

export const config = {
    api: {
        bodyParser: false,
    },
};

const NEXT_PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const NEXT_PUBLIC_PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

export default async function uploadData(
    req: any,
    res: any
) {
    upload.single('file')(req, res, async (err: any) => {
        if (err) {
            return res.status(500).json({ error: 'Upload error.' });
        }
        try {
            const { vaultAccountId, commodityDetails } = req.body;
            const commoDetails = JSON.parse(commodityDetails);
            const file = req.file;
            const pinata = new pinataSdk(
                NEXT_PUBLIC_PINATA_API_KEY,
                NEXT_PUBLIC_PINATA_API_SECRET
            );


            let payload = { ...commoDetails, vaultAccountId }

            await pinata
                .testAuthentication()
                .then((data) => {
                    console.log("Running: ", data);
                })
                .catch((e) => {
                    console.log(e.message);
                    throw new Error("Authentication failed");
                });

            // const imageOptions = {
            //     pinataMetadata: {
            //         name: file.originalname,
            //     },
            // };
            // console.log(imageOptions, "imageOptions")
            // const stream = Readable.from(file.buffer);
            // console.log("🚀 ~ stream:", stream)
            // const imageResult = await pinata.pinFileToIPFS(stream, imageOptions);
            // console.log("🚀 ~ imageResult:", imageResult)
            // console.log("Image Pinata Result: ", imageResult);

            // Create JSON content
            const jsonContent = {
                // display: {
                //     url: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageResult.IpfsHash}`,
                // },
                payload
            };

            console.log(jsonContent, "jsonContent")

            // Pin JSON content
            const jsonOptions = {
                pinataMetadata: {
                    // name: name,
                    keyvalues: {
                        type: "JSON",
                    },
                    pinataOptions: {
                        cidVersion: 0,
                    },
                },
            };
            const jsonResult = await pinata.pinJSONToIPFS({
                pinataContent: jsonContent,
                options: jsonOptions,
            });
            // const image = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageResult.IpfsHash}`;
            res.send({ json: jsonResult.IpfsHash });

        } catch (e: any) {
            res.status(400).send(e.message);
            console.log("ERROR: " + e);
        }
    });
}
