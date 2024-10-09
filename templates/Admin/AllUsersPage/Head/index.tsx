import Icon from "@/components/Icon";
import Search from "@/components/Search";
import cn from "classnames";
import styles from "./Head.module.sass";
import { useTranslation } from "react-i18next";

type HeadProps = {
    search: string;
    setSearch: any;
    onSubmit: any;
    // onFilter: () => void;
    visible: boolean;
    onFreezeFilter: () => void;
    onUnfreezeFilter: () => void;
    freezeFilter: boolean;
    unfreezeFilter: boolean;
};

const Head = ({
    search,
    setSearch,
    onSubmit,
    // onFilter,
    visible,
    onFreezeFilter,
    onUnfreezeFilter,
    freezeFilter,
    unfreezeFilter,
}: HeadProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.head}>
                <Search
                    className={styles.search}
                    classInput={styles.input}
                    placeholder={t("adminPage.searchby")}
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    onSubmit={onSubmit}
                />
                <div className={styles.btns}>
                    <button
                        className={cn("button-stroke", styles.button, {
                            [styles.active]: freezeFilter,
                        })}
                        onClick={onFreezeFilter}
                    >
                        <Icon name="filter" />
                        <span>Freeze</span>
                    </button>
                    <button
                        className={cn("button-stroke", styles.button, {
                            [styles.active]: unfreezeFilter,
                        })}
                        onClick={onUnfreezeFilter}
                    >
                        <Icon name="filter" />
                        <span>Unfreeze</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Head;
