import Card from "@/components/Card";
import Fiat from "@/components/Fiat";
import Icon from "@/components/Icon";
import Transfer from "@/components/Transfer";
import cn from "classnames";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buy from "../Buy";
import { Context } from "../Context/Context";
import Deposit from "../Deposit";
import styles from "./TotalBalance.module.sass";
import OTC from "../OTC";

type TotalBalanceProps = {
    percent?: number;
};

const TotalBalance = ({ percent }: TotalBalanceProps) => {
    const { t } = useTranslation();
    const { user, assetsBalance } = useContext(Context);
    const [show, setShow] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast(t("notificationPage.copiedclip"));
    };

    return (
        <Card title={t("overviewCategory.walletbalancesection")} tooltip="">
            {user?.wallet?.address && (
                <div className={styles.address}>
                    {`${user?.wallet?.address.slice(0, 8)}...${user?.wallet?.address.slice(
                        user?.wallet?.address.length - 8,
                        user?.wallet?.address.length
                    )}`}
                    <IoCopyOutline
                        size="18"
                        style={{ cursor: "pointer" }}
                        onClick={() => copyToClipboard(user?.wallet?.address)}
                    />
                </div>
            )}
            <div className={styles.price}>
                {show ? Number(assetsBalance?.filter((i: any) => i?.id === "MATIC_POLYGON")[0]?.total || "0").toFixed(
                    4
                ) || 0 : "********"}{" "}
                <div style={{ cursor: "pointer", position: 'absolute', left: 120, top: -20 }} onClick={() => setShow(!show)}>
                    <Icon name={show ? "eye-slash" : "eye"} size="18" />
                </div>
            </div>
            {percent && (
                <div className={styles.line}>
                    <div className={cn(styles.indicator, percent < 0 && styles.negative)}>
                        <Icon name="arrow-thick-right" size="12" />
                        {percent > 0 ? `+${percent}` : percent}%
                    </div>
                    {t("walletsPage.increasethismonth")}
                </div>
            )}
            <div className={styles.btns}>
                <Transfer className={styles.button} />
                <Fiat className={styles.button} />
            </div>
            <div className={styles.btns} style={{ marginTop: "10px" }}>
                <Deposit className={styles.button} />
                <Buy className={styles.button} />
            </div>
            <div className={styles.btns} style={{ marginTop: "10px" }}>
                <OTC className={styles.button} />
            </div>
        </Card>
    );
};

export default TotalBalance;
