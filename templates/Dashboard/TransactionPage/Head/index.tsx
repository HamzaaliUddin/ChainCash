import { useState } from "react";
import cn from "classnames";
import styles from "./Head.module.sass";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Export from "../Export";
import { useTranslation } from "react-i18next";

type HeadProps = {
    search: string;
    setSearch: any;
    onSubmit: any;
    onFilter: () => void;
    visible: boolean;
};

const Head = ({ search, setSearch, onSubmit, onFilter, visible }: HeadProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const { t } = useTranslation()

    const handleClick = () => {
        setVisibleModal(true);
        setResult(false);
    };

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
                    <button className={cn("button-stroke", styles.button)} onClick={handleClick}>
                        <Icon name="export" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideClose={result}
            >
                <Export onConfirm={() => setResult(true)} result={result} onDone={() => setVisibleModal(false)} />
            </Modal>
        </>
    );
};

export default Head;
