import cn from "classnames";
import styles from "./PasswordSucessfully.module.sass";
import Description from "../../Description";
import { useTranslation } from "react-i18next";

type PasswordSucessfullyProps = {
    onLogin?: () => void;
};

const PasswordSucessfully = ({ onLogin }: PasswordSucessfullyProps) => {
    const {t} = useTranslation()
    return (
        <Description
            title={t('words.passwordsuccess')}
            info={t('words.checkemaildesc')}
            sucessfully
        >
            <button
                className={cn("button-wide", styles.button)}
                onClick={onLogin}
            >
                {t('notificationPage.loginnow')}
            </button>
        </Description>
    );
};

export default PasswordSucessfully;
