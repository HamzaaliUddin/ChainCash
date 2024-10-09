import { useContext, useEffect, useState } from "react";
import Card from "@/components/Card";
import cn from "classnames";
import { Context } from "../Context/Context";
import styles from "./SubAccount.module.sass";
import { useTranslation } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const SubAccount = () => {
    const { user } = useContext(Context);
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const [flexDirection, setFlexDirection] = useState<FlexDirection>("column");
    const [subAccountInfo, setSubAccountInfo] = useState<any>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(t("notificationPage.copiedclip"));
    };

    const getInfo = async () => {
        try {
            const response = await fetch("/api/subAccountInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            }).then(r => r.json());
            setSubAccountInfo(response.iuguSubAccount);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        const updateFlexDirection = () => {
            setFlexDirection(window.innerWidth >= 330 ? "row" : "column");
        };
        updateFlexDirection();
        window.addEventListener("resize", updateFlexDirection);
        return () => {
            window.removeEventListener("resize", updateFlexDirection);
        };
    }, []);

    return (
        <Card title={t("walletsPage.ChainCashAccount")} tooltip="" onSeeMore={() => setOpen(!open)}>
            {open &&
                <div className={cn(styles.row, { [styles.rowColumn]: "" })}>
                    <div style={{ width: "100%" }}>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("overviewCategory.bankname")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                <IoCopyOutline
                                    size="18"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => copyToClipboard("401")}
                                />
                                {t("overviewCategory.accessPaymentSolutionsS")}
                            </div>
                        </div>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("overviewCategory.banknumber")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                <IoCopyOutline
                                    size="18"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => copyToClipboard("401")}
                                />
                                {"401"}
                            </div>
                        </div>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("overviewCategory.bankAccountNumber")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {subAccountInfo?.bank_accounts.number && (
                                    <IoCopyOutline
                                        size="18"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => copyToClipboard(subAccountInfo?.bank_accounts.number)}
                                    />
                                )}
                                {subAccountInfo?.bank_accounts.number ? subAccountInfo?.bank_accounts.number : "N/A"}
                            </div>
                        </div>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("overviewCategory.agency")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <IoCopyOutline
                                    size="18"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => copyToClipboard("0002")}
                                />
                                {"0002"}
                            </div>
                        </div>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("walletsPage.accountId")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {user?.iuguSubaccount?.account_id && (
                                    <IoCopyOutline
                                        size="18"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => copyToClipboard(user?.iuguSubaccount?.account_id)}
                                    />
                                )}

                                {user?.iuguSubaccount?.account_id
                                    ? `${user?.iuguSubaccount?.account_id.slice(
                                        0,
                                        6
                                    )}...${user?.iuguSubaccount?.account_id.slice(
                                        user?.iuguSubaccount?.account_id.length - 6,
                                        user?.iuguSubaccount?.account_id.length
                                    )}`
                                    : ""}
                            </div>
                        </div>
                        <div
                            className={styles.item}
                            style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "space-between",
                                flexDirection: `${flexDirection}`,
                            }}
                        >
                            <div className={styles.title}>{t("overviewCategory.walletbalancesection")}</div>
                            <div className={styles.value} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {subAccountInfo?.balance && (
                                    <IoCopyOutline
                                        size="18"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => copyToClipboard(subAccountInfo?.balance)}
                                    />
                                )}
                                {subAccountInfo?.balance || ""}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Card>
    );
};

export default SubAccount;
