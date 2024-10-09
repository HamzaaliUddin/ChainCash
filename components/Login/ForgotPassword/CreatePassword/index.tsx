import { useState } from "react";
import cn from "classnames";
import styles from "./CreatePassword.module.sass";
import Field from "@/components/Field";
import Description from "../../Description";
import { useTranslation } from "react-i18next";

type CreatePasswordProps = {
    onBack: () => void;
    onContinue: () => void;
};

const CreatePassword = ({ onBack, onContinue }: CreatePasswordProps) => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const {t} = useTranslation()

    const level: number = 3;

    return (
        <Description
            title={t('notificationPage.createnewpassword')}
            info={t('words.emailaccountdesc')}
            onBack={onBack}
            arrow
        >
            <form
                className={styles.form}
                action=""
                onSubmit={() => console.log("Submit")}
            >
                <Field
                    className={styles.field}
                    label={t('settingsPage.newpassword')}
                    placeholder={t('settingsPage.typenewpass')}
                    type="password"
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    required
                />
                <div className={styles.reliability}>
                    <div className={styles.note}>
                        {t('words.charactersdesc')}
                    </div>
                    <div className={styles.line}>
                        <div
                            className={cn(styles.progress, {
                                [styles.level1]: level === 1,
                                [styles.level2]: level === 2,
                                [styles.level3]: level === 3,
                                [styles.level4]: level === 4,
                            })}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={styles.text}>
                            {level === 1
                                ? t('notificationPage.low')
                                : level === 2
                                    ? t('notificationPage.medium')
                                : level === 3
                                ? t('notificationPage.strong')
                                : t('notificationPage.maximum')}
                        </div>
                    </div>
                </div>
                <Field
                    className={styles.field}
                    label={t('words.repeatpass')}
                    placeholder={t('words.typerepeatpass')}
                    type="password"
                    value={repeatPassword}
                    onChange={(e: any) => setRepeatPassword(e.target.value)}
                    required
                />
                <button
                    className={cn("button-wide", styles.button)}
                    onClick={onContinue}
                >
                    {t('registerPage.continue')}
                </button>
            </form>
        </Description>
    );
};

export default CreatePassword;
