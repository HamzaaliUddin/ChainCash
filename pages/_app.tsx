import { Context } from "@/components/Context/Context";
import "@/styles/app.sass";
import "@/styles/global.css";
import { Manrope } from "@next/font/google";
import axios from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/LanguageSupport/i18n";
import "react-phone-input-2/lib/style.css";
import getDeposit from "./api/getDepositRequest";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebase";
import Head from "next/head";
import { webhook } from "@/utils/capitual";

const manrope = Manrope({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "block",
});

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<any>(null);
    const [vaultAccount, setVaultAccount] = useState<any>([]);
    const [txdata, setTxdata] = useState<any>([]);
    const [txStatus, setTxStatus] = useState<any>({
        COMPLETED: "",
        FAILED: "",
        SUBMITTED: "",
        COMPLETEDSTATUS: [],
    });
    const [assetsBalance, setAssetsBalance] = useState<any>([]);
    const [allcommodity, setAllCommodity] = useState<any>([]);
    const [countryData, setCountryData] = useState<any[]>([]);
    const [priceUSD, setPriceUSD] = useState<any[]>([]);
    const [userIp, setUserIp] = useState<any>({});
    const [combinedData, setCombinedData] = useState<any[]>([]);
    const [depositRequest, setDepositRequest] = useState<any[]>([]);

    const [userType, setUserType] = useState("buyer");
    const [commodityType, setCommodityType] = useState("grain");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [value, setValue] = useState("");
    const [otherParticularities, setOtherParticularities] = useState("");
    const [createCommidity, setCreateCommidity] = useState("");
    const [userCard, setUserCard] = useState("");
    const [CryptoCurrencyData, setCryptoCurrencyData] = useState<any[]>([]);

    const router = useRouter();
    const { t } = useTranslation();
    const kyc = async () => {
        try {
            const session = await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/session`, {
                    clientId: user?.clientId,
                    userId: user?.uid,
                    displayName: user?.displayName,
                })
                .then((res) => res.data);
            let popup = window.open(
                session?.redirectUrl,
                "ModalPopUp",
                "toolbar=no," +
                "scrollbars=no," +
                "location=no," +
                "statusbar=no," +
                "menubar=no," +
                "resizable=0," +
                "width=700," +
                "height=600"
            );

            popup?.focus();
        } catch (error) {
            console.log(error);
        }
    };

    const getKyc = async () => {
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_URL}/check`, {
                id: user?.clientId,
            });
            if (result.data.items) {
                await updateDoc(doc(db, "chainCash", user?.id), { clientIdVerified: true });
                await updateDoc(doc(db, "chainCash", user?.id), { kycResult: result.data });
                if (userIp.country_code === "BR") {
                    const response = await fetch("/api/createSubaccount", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ user }),
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    await updateDoc(doc(db, "chainCash", user?.id), {
                        iuguSubaccount: data.iuguSubAccount,
                    });
                    setUser({
                        ...user,
                        clientIdVerified: true,
                        kycResult: result.data,
                        iuguSubaccount: data.iuguSubAccount,
                    });
                } else {
                    setUser({
                        ...user,
                        clientIdVerified: true,
                        kycResult: result.data,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDepositReq = async () => {
        try {
            // webhook("https://acbf-103-31-100-11.ngrok-free.app/api/capitualWebhooks", "CRYPTO_RECEIVED", "Local webhook")
            // webhook("https://chaincash.vercel.app/api/capitualWebhooks", "CRYPTO_RECEIVED", "Development webhook")
            // webhook("https://chaincash.online/api/capitualWebhooks", "CRYPTO_RECEIVED", "Live webhook")
            const deposit: any = await getDeposit();
            setDepositRequest(deposit);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDepositReq();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserLocalStorage = () => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) return router.replace("/login");
            const dbUser = await getDoc(doc(db, "chainCash", user?.uid));
            setUser({ ...user, ...dbUser.data(), id: user?.uid });
        });
    };

    useEffect(() => {
        getUserLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);

    useEffect(() => {
        const combined = [...txdata, ...depositRequest].sort((a, b) => {
            const dateA = new Date(a.dueDate || a.createdAt);
            const dateB = new Date(b.dueDate || b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });
        setCombinedData(combined);
    }, [txdata, depositRequest]);

    // Modify the useEffect hook to update local storage when user state changes

    useEffect(() => {

        fetch("https://api.ipdata.co/?api-key=82521dc0ecf33753c9e40c3e032a4dab505ba43fa9e9403e1647bb38")
            .then((response) => response.json())
            .then((data) => setUserIp(data));

        if (user && (!user.clientIdVerified || !user.kycResult)) {
            getKyc();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Modify the DashboardPage component to ensure user is loaded before rendering

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${manrope.style.fontFamily};
                }
            `}</style>
            <Head>
                <title>Chain Cash | Crypto Cross Border Platform</title>
            </Head>
            <Context.Provider
                value={{
                    user,
                    setUser,
                    vaultAccount,
                    setVaultAccount,
                    txdata,
                    setTxdata,
                    txStatus,
                    setTxStatus,
                    assetsBalance,
                    setAssetsBalance,
                    allcommodity,
                    setAllCommodity,
                    countryData,
                    setCountryData,
                    priceUSD,
                    setPriceUSD,
                    userIp,
                    setUserIp,
                    combinedData,
                    setCombinedData,
                    depositRequest,
                    setDepositRequest,
                    userType,
                    setUserType,
                    commodityType,
                    setCommodityType,
                    type,
                    setType,
                    quantity,
                    setQuantity,
                    value,
                    setValue,
                    otherParticularities,
                    setOtherParticularities,
                    createCommidity,
                    setCreateCommidity,
                    userCard,
                    setUserCard,
                    CryptoCurrencyData, setCryptoCurrencyData
                }}
            >
                {/* <Tooltip /> */}
                {router.pathname !== "/login" && (
                    <div>
                        {(user?.emailVerified === false || user?.clientIdVerified === false) && (
                            <div
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "16px",
                                }}
                            >
                                {user?.clientIdVerified === false && (
                                    <>
                                        <p style={{ fontWeight: "bold", color: "#FF0000" }}>{t("kyc.completeKYC")}</p>
                                        <button
                                            onClick={kyc}
                                            style={{
                                                marginLeft: "8px",
                                                fontWeight: "bold",
                                                backgroundColor: "#23978D",
                                                color: "white",
                                                border: "1px solid",
                                                borderRadius: "10px",
                                                paddingLeft: "8px",
                                                paddingRight: "8px",
                                            }}
                                        >
                                            {t("kyc.verify")}
                                        </button>
                                    </>
                                )}
                                {user?.emailVerified === false && (
                                    <p style={{ fontWeight: "bold", color: "#FF0000" }}>{t("kyc.checkEmail")}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <Component {...pageProps} />
                <ToastContainer transition={Slide} newestOnTop />
            </Context.Provider>
        </>
    );
}
