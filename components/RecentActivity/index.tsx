import Card from "@/components/Card";
import axios from "axios";
import { useRouter } from "next/router";
import updateUser from "pages/api/updateUser";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../Context/Context";
import styles from "./RecentActivity.module.sass";

type ActivityType = {
    id: string;
    title: string;
    price: string;
    description: string;
    time: string;
    image: string;
};

type RecentActivityProps = {
    viewItems?: number;
    items: ActivityType[];
};

const RecentActivity = ({ }: RecentActivityProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { vaultAccount, setVaultAccount, user, txdata, setTxdata, txStatus, setTxStatus } = useContext(Context);

    const getVaultAccountsWithPageInfo = async () => {
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_URL}/getVaultAccountsWithPageInfo`)
                .then((res) => res.data)
                .then((data) => setVaultAccount(data.accounts));
            updateUser(user.id, {
                vaultAccount: vaultAccount.filter((i: ActivityType) => i.id === user.vaultAccount.id)[0],
            });
        } catch (err) {
            console.error(err);
        }
    };

    const gettx = async () => {
        try {
            const tx: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}/getTransactions`).then((res) => res.data);
            setTxdata(tx);
            const txCompletedlen = tx.filter(
                (i: any) =>
                    i.status === "COMPLETED" &&
                    i.note !== "Faucets Sent!" &&
                    (i.sourceAddress === user?.wallet?.address || i.destinationAddress === user?.wallet?.address)
            );
            setTxStatus((pre: any) => ({ ...pre, COMPLETEDSTATUS: txCompletedlen }));
            setTxStatus((pre: any) => ({ ...pre, COMPLETED: txCompletedlen.length }));
            const txFailedLen = tx.filter((i: any) => i.status === "FAILED");
            setTxStatus((pre: any) => ({ ...pre, FAILED: txFailedLen.length }));
            const txSubmittedLen = tx.filter((i: any) => i.status === "SUBMITTED");
            setTxStatus((pre: any) => ({ ...pre, SUBMITTED: txSubmittedLen.length }));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getVaultAccountsWithPageInfo();
        gettx();
        // eslint-disable-next-line
    }, []);

    return (
        <Card
            title={t("overviewCategory.recentsec")}
            tooltip=""
            onSeeMore={() => router.replace("/dashboard/transaction")}
        >
            <div className={styles.list}>
                {txdata.length ? (
                    txStatus?.COMPLETEDSTATUS.slice(0, 4).map((item: any, idx: any) => (
                        <div className={styles.item} key={idx}>
                            <div className={styles.details}>
                                <div className={styles.line}>
                                    <div
                                        className={styles.title}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            window.open(
                                                `${item?.assetId === "MATIC_POLYGON"
                                                    ? "https://polygonscan.com" :
                                                    item?.assetId === "USDC_POLYGON" ? "https://polygonscan.com" :
                                                        item?.assetId === "USDT_POLYGON" ? "https://polygonscan.com"
                                                            : item?.assetId === "ETH_TEST3"
                                                                ? "https://goerli.etherscan.io"
                                                                : "#"
                                                }/tx/${item?.txHash}`
                                            )
                                        }
                                    >{`${item?.txHash.slice(0, 6)}...${item?.txHash.slice(
                                        item?.txHash.length - 6,
                                        item?.txHash.length
                                    )}`}</div>
                                    <div className={styles.price}>{item?.amount}</div>
                                </div>
                                <div className={styles.line}>
                                    <div className={styles.description}> {item?.status}</div>
                                    <div className={styles.time}>{`${new Date(
                                        item?.createdAt || ""
                                    )?.getDate()}/${new Date(item?.createdAt || "").getDay()}/${new Date(
                                        item?.createdAt
                                    ).getFullYear()}  ${new Date(item?.createdAt || "").getHours()}:${new Date(
                                        item?.createdAt || ""
                                    ).getMinutes()}`}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.line}>{t("words.notransaction")}</div>
                )}
            </div>
        </Card>
    );
};

export default RecentActivity;
