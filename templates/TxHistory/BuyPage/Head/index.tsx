import Icon from "@/components/Icon";
import Search from "@/components/Search";
import cn from "classnames";
import styles from "./Head.module.sass";
import { useTranslation } from "react-i18next";

type HeadProps = {
    search: string;
    setSearch: any;
    onSubmit: any;
    onFilter: () => void;
    visible: boolean;
};

const Head = ({ search, setSearch, onSubmit, onFilter, visible }: HeadProps) => {
    const { t } = useTranslation()
    return (
        <>
            <div className={styles.head}>
                <Search
                    className={styles.search}
                    classInput={styles.input}
                    placeholder={t('words.serachtransacdesc')}
                    value={search}
                    onChange={setSearch}
                    onSubmit={onSubmit}
                />
                <div className={styles.btns}>
                    <button
                        className={cn("button-stroke", styles.button, {
                            [styles.active]: visible,
                        })}
                        onClick={onFilter}
                    >
                        <Icon name="filter" />
                        <span>Filter</span>
                    </button>
                    <button className={cn("button-stroke", styles.button)}>
                        <Icon name="export" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Head;
