import { useState } from "react";
import cn from "classnames";
import styles from "./QuickTransfer.module.sass";
import Card from "@/components/Card";
import Contacts from "@/components/Contacts";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";

type QuickTransferProps = {
    contacts: any;
};

const QuickTransfer = ({ contacts }: QuickTransferProps) => {
    const [amount, setAmount] = useState<string>("");
    const {t} = useTranslation()

    return (
        <Card title={t('notificationPage.quicktransfer')} tooltip="">
            <Contacts
                className={styles.contacts}
                items={contacts}
                slidesPerViewTablet={3}
                slidesPerViewDesktop={4}
            />
            <form
                className={styles.form}
                action=""
                onSubmit={() => console.log("Form submit")}
            >
                <Field
                    className={styles.field}
                    placeholder={t('words.typeinput')}
                    iconBefore="dollar-circle"
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                    required
                />
                <button className={cn("button", styles.button)}>
                    <span>{t('words.send')}</span>
                    <Icon name="send" />
                </button>
            </form>
        </Card>
    );
};

export default QuickTransfer;
