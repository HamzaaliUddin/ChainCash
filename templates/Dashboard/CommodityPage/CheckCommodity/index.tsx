import Field from "@/components/Field";
import React, { useContext, useState } from "react";
import cn from "classnames";
import styles from "../AddCommodity/AddCommodity.module.sass";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { Context } from "@/components/Context/Context";
import { useTranslation } from "react-i18next";

function CheckCommodity({
    loading,
    setLoading,
    comodityIdData,
    setComodityIdData,
}: Readonly<{
    loading: boolean | number;
    setLoading: (loading: boolean | number) => void;
    comodityIdData: [number, any, string, string, number, any?];
    setComodityIdData: (data: any) => void;
}>) {
    const [commodityId, setCommodityId] = useState<string>("");
    const { user } = useContext(Context);
    const { t } = useTranslation();

    const commodities = async () => {
        try {
            setLoading(3);
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/commodities`, {
                    comodityId: commodityId,
                    vaultAccountId: Number(user.wallet.id),
                })
                .then((res) => res.data)
                .then((data) => setComodityIdData(data));
            setLoading(false);
            toast(t("words.shown"));
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "10px" }}>{t("notificationPage.checkcommodity")}</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Field
                    label={t("commodityCategory.commodityid")}
                    placeholder={t("commodityCategory.commodityid")}
                    type="number"
                    value={commodityId}
                    onChange={(e: any) => setCommodityId(e.target.value)}
                    required
                    min={0}
                />
                <button
                    style={{ marginBlock: "7px" }}
                    className={cn("button-small", styles.button)}
                    onClick={commodities}
                >
                    {loading === 3 ? t("overviewCategory.loading") + "..." : t("commodityCategory.check")}
                </button>
            </div>

            {comodityIdData[1] && (
                <div>
                    <div className="d-flex">
                        {t("commodityCategory.commodityname")}:{" "}
                        {(comodityIdData[0] === 0 && t("commodityCategory.rice")) ||
                            (comodityIdData[0] === 1 && t("commodityCategory.sugar")) ||
                            (comodityIdData[0] === 2 && t("commodityCategory.corn"))}
                    </div>
                    <div className="d-flex">
                        {t("commodityCategory.price")}:{" "}
                        {ethers.utils.formatEther(comodityIdData[1].hex.toLocaleString())}
                    </div>
                    <div className="d-flex">
                        {t("commodityCategory.buyer")}: {comodityIdData[2]}
                    </div>
                    <div className="d-flex">
                        {t("commodityCategory.seller")}: {comodityIdData[3]}
                    </div>
                    <div className="d-flex">
                        {t("transactionCategory.Status")}:{" "}
                        {(comodityIdData[4] === 0 && t("adminPage.open")) ||
                            (comodityIdData[4] === 1 && t("adminPage.completed")) ||
                            (comodityIdData[4] === 2 && t("adminPage.canceled")) ||
                            (comodityIdData[4] === 3 && t("words.disputed")) ||
                            (comodityIdData[4] === 4 && t("words.resolved")) ||
                            (comodityIdData[4] === 5 && t("words.autoresolved"))}
                    </div>
                    <div className="d-flex">
                        {t("commodityCategory.duedate")}:{" "}
                        {new Date(Number(parseInt(comodityIdData[5]?.hex, 16).toString() || "0") || "").getDay()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckCommodity;
