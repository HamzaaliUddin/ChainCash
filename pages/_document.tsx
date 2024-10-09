import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="title" content="Chain Cash | Crypto Cross Border Platform" />
                    <meta
                        name="description"
                        content="The One-Stop Crypto Platform For Cross Border Payments and Commodities Contracts."
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.chaincash.online/login " />
                    <meta property="og:title" content="Chain Cash | Crypto Cross Border Platform" />
                    <meta
                        property="og:description"
                        content="The One-Stop Crypto Platform For Cross Border Payments and Commodities Contracts."
                    />
                    <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://www.chaincash.online/login " />
                    <meta property="twitter:title" content="Chain Cash | Crypto Cross Border Platform" />
                    <meta
                        property="twitter:description"
                        content="The One-Stop Crypto Platform For Cross Border Payments and Commodities Contracts."
                    />
                    <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />
                </Head>
                <body className="app">
                    <Script
                        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                        strategy="beforeInteractive"
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
