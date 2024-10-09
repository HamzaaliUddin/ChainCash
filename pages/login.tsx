import { Context } from "@/components/Context/Context";
import LoginPage from "@/templates/Login/LoginV1Page";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { lookup } from "geoip-lite2";
import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Login: NextPage = () => {
    const { user, userIp, setUserIp } = useContext(Context);

    const { t } = useTranslation();
    const { get } = useSearchParams();
    const router = useRouter();

    const getKYCVerified = async () => {
        try {
            if (get("kycverfication")) {
                const status: "error" | "success" = get("kycverfication") as any;
                if (status)
                    toast[status](
                        "Kyc verfication " + ((status as string) === "success") ? "successful" : "has failed"
                    );

                if (status === "success") {
                    if (userIp && userIp.country_code === "BR") {
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
                            clientIdVerified: true,
                            iuguSubaccount: data.iuguSubAccount,
                        });
                        router.push("/dashboard");
                        toast.success(t("dashboardPage.subAccount"));
                    } else {
                        toast.error("Request not allowed from this location.");
                        await updateDoc(doc(db, "chainCash", user?.id), {
                            clientIdVerified: true,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetch("https://api.ipdata.co/?api-key=82521dc0ecf33753c9e40c3e032a4dab505ba43fa9e9403e1647bb38")
            .then((response) => response.json())
            .then((data) => setUserIp(data));
        getKYCVerified();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <LoginPage />;
};

export default Login;
