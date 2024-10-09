import Field from "@/components/Field";
import React, { useContext, useState } from "react";
import cn from "classnames";
import styles from "../AddCommodity/AddCommodity.module.sass";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Context } from "@/components/Context/Context";

function CancelCommodity({
    loading,
    setLoading,
}: {
    loading: boolean | number;
    setLoading: (loading: boolean | number) => void;
}) {
    const [commodityId, setCommodityId] = useState<string>("");
    const { t } = useTranslation();
    const { user } = useContext(Context);

    const cancelComodity = async () => {
        try {
            setLoading(1);
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/cancelComodity`, {
                    commodityId: commodityId,
                    vaultAccountId: Number(user.wallet.id),
                })
                .then((res) => res.data);
            setLoading(false);
            toast("Commodity Canceled");
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "10px" }}>{t("commodityCategory.cancelcommodity")}</h1>

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
                    onClick={cancelComodity}
                >
                    {loading === 1 ? t("overviewCategory.loading") + "..." : t("adminPage.cancel")}
                </button>
            </div>
        </div>
    );
}

export default CancelCommodity;
