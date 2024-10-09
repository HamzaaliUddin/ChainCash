import Search from "@/components/Search";
import styles from "./Head.module.sass";
import { useTranslation } from "react-i18next";

type HeadProps = {
    search: string;
    setSearch: any;
    onSubmit: any;
    onFilter: () => void;
    visible: boolean;
};

const Head = ({ search, setSearch, onSubmit }: HeadProps) => {
    const { t } = useTranslation()
    return (
        <>
            <div className={styles.head}>
                <Search
                    className={styles.search}
                    classInput={styles.input}
                    placeholder={t('overviewCategory.searchsec')}
                    value={search}
                    onChange={setSearch}
                    onSubmit={onSubmit}
                />
            </div>
        </>
    );
};

export default Head;
