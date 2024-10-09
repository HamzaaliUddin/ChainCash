import { useState } from "react";
import cn from "classnames";
import styles from "./Delete.module.sass";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";

type DeleteProps = {};

const Delete = ({ }: DeleteProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const { t } = useTranslation()

    return (
        <>
            <button
                className={styles.action}
                onClick={() => setVisibleModal(true)}
            >
                <Icon name="trash" size="20" />
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideClose
            >
                <div className={styles.icon}>
                    <Icon name="trash" size="51" />
                </div>
                <div className={styles.title}>{t('notificationPage.deletetransaction')} ?</div>
                <div className={styles.info}>
                    {t('notificationPage.deletetrans')}?
                </div>
                <div className={styles.btns}>
                    <button
                        className={cn("button-stroke", styles.button)}
                        onClick={() => setVisibleModal(false)}
                    >
                        {t('adminPage.cancel')}
                    </button>
                    <button
                        className={cn("button", styles.button)}
                        onClick={() => setVisibleModal(false)}
                    >
                        {t('adminPage.yes')}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Delete;
