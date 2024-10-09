import { Context } from "@/components/Context/Context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function CommodityCounter() {
    const { user } = useContext(Context);
    const { t } = useTranslation();

    const [totalcomodity, setTotalComodity] = useState<any>();
    const commodityCounter = async () => {
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_URL}/commodityCounter/${Number(user?.wallet?.id)}`)
                .then((res) => res.data)
                .then((data) => setTotalComodity(parseInt(data.hex, 16).toLocaleString()));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        commodityCounter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <div>
            {totalcomodity && (
                <div>
                    <div style={{ display: "flex", gap: "4px" }}>
                        <p>{t("words.totalcommodities")}:</p>
                        <p>{totalcomodity}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommodityCounter;
