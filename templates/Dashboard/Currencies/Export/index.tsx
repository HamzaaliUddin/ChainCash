import { useState } from "react";
import cn from "classnames";
import styles from "./Export.module.sass";
import Select from "@/components/Select";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";

type ExportProps = {
    onConfirm?: () => void;
    result?: boolean;
    onDone?: () => void;
};

const Export = ({ onConfirm, result, onDone }: ExportProps) => {
    const {t} = useTranslation()
    const files = [
        {
            title: "PDF",
            value: "pdf",
        },
        {
            title: "DOC",
            value: "doc",
        },
    ];

    const [exportData, setExportData] = useState<string>(files[0].value);

    const handleChange = (value: string) => setExportData(value);

    return result ? (
        <div className={styles.success}>
            <div className={styles.icon}>
                <Icon name="check-circle" size="51" />
            </div>
            <div className={styles.title}>{t('words.exportsuccess')}</div>
            <div className={styles.info}>
                {t('words.checkdocdesc')}
            </div>
            <button
                className={cn("button-wide", styles.button)}
                onClick={onDone}
            >
                {t('notificationPage.done')}
            </button>
        </div>
    ) : (
        <div className={styles.export}>
            <div className={styles.title}>{t('notificationPage.exportdata')}</div>
                <div className={styles.info}>{t('notificationPage.exportintodocument')}</div>
            <Select
                className={styles.select}
                label="Choose type of document"
                value={exportData}
                onChange={handleChange}
                options={files}
            />
            <button
                className={cn("button-wide", styles.button)}
                onClick={onConfirm}
            >
                Confirm
            </button>
        </div>
    );
};

export default Export;
