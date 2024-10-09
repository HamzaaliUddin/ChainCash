import Card from "@/components/Card";
import cn from "classnames";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import getCommodities from "pages/api/getCommodities";
import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import styles from "./PocketPlans.module.sass";
import { useTranslation } from "react-i18next";

type PlansType = {
    id: string;
    title: string;
    price: string;
    image: string;
};

type PocketPlansProps = {
    items: PlansType[];
    more?: boolean;
    row?: boolean;
};

const PocketPlans = ({ row }: PocketPlansProps) => {
    const { t } = useTranslation();
    const { allcommodity, setAllCommodity, user } = useContext(Context);
    const router = useRouter();
    const getCommody = async () => {
        try {
            const commodity = await getCommodities();
            setAllCommodity(commodity);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCommody();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Card
            title={t("overviewCategory.commoditysec")}
            tooltip=""
            onSeeMore={() => router.replace("/dashboard/commodity")}
        >
            <div className={cn(styles.list, { [styles.listRow]: row })}>
                {allcommodity.length ? (
                    allcommodity?.slice(0, 4).map((item: any, idx: any) => (
                        <div className={styles.item} key={item.id}>
                            <div className={styles.title}>
                                {(item.commodityName === "0" && t("commodityCategory.rice")) ||
                                    (item.commodityName === "1" && t("commodityCategory.sugar")) ||
                                    (item.commodityName === "2" && t("commodityCategory.corn"))}
                            </div>
                            <div className={styles.price}>
                                {item.commodityPrice.hex
                                    ? ethers?.utils?.formatEther(item?.commodityPrice?.hex?.toLocaleString())
                                    : item.commodityPrice}
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </Card>
    );
};
export default PocketPlans;
