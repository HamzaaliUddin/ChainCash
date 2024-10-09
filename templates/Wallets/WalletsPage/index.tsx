import BalanceAnalytics from "@/components/BalanceAnalytics";
import Currency from "@/components/Currency";
import Layout from "@/components/Layout";
import TotalBalance from "@/components/TotalBalance";
import styles from "./WalletsPage.module.sass";
import cn from "classnames";
// import { balanceAnalytics } from "@/mocks/balanceAnalytics";
import { currency } from "@/mocks/currency";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "@/components/Context/Context";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-toastify";
import SubAccount from "@/components/SubAccount";
import ConfigureSubAccount from "@/components/ConfigureSubAccount";
import SubAccountVerification from "@/components/SubAccountVerification";

type TransferProps = {
    className?: string;
};

const WalletsPage = ({ className }: TransferProps) => {
    const { user, setUser, userIp } = useContext(Context);
    const { t } = useTranslation();
    const router = useRouter();

    const breadcrumbs = [
        {
            title: t("dashboardPage.wallets"),
            url: "/wallets",
        },
        {
            title: t("dashboardPageCategories.overview"),
        },
    ];

    const post = async () => {
        try {
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
            setUser({
                ...user,
                clientIdVerified: true,
                iuguSubaccount: data.iuguSubAccount,
            });
            router.push("/dashboard");
            toast.success(t("dashboardPage.subAccount"));
        } catch (error) {
            toast.error(t("dashboardPage.errorcreatingsubaccount"));
            console.error("Error creating sub-account:", error);
        }
    };

    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TotalBalance percent={3.1} />
                    <Currency items={currency} viewItems={4} />
                </div>
                <div className={styles.col}>
                    <BalanceAnalytics items={[]} />
                    {(!user?.iuguSubaccount && userIp.country_code === "BR") &&
                        <div style={{ marginTop: "10px" }}>
                            <button className={cn("button", className)} onClick={post}>Create Iugu SubAccount</button>
                        </div>}
                    {user?.iuguSubaccount && <SubAccount />}

                    {user?.iuguSubaccount && <div>
                        <ConfigureSubAccount />
                    </div>}

                    {user?.iuguSubaccount &&
                        <div>
                            <SubAccountVerification />
                        </div>}
                </div>
            </div>
        </Layout>
    );
};

export default WalletsPage;
