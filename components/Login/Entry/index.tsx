import Checkbox from "@/components/Checkbox";
import { Context } from "@/components/Context/Context";
import Field from "@/components/Field";
import { auth } from "@/utils/firebase";
import cn from "classnames";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import getUser from "pages/api/getUser";
import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import Description from "../Description";
import styles from "./Entry.module.sass";

type EntryProps = {
    onForgotPassword: () => void;
    onVerify: () => void;
    onRegister: () => void;
};

const Entry = ({ onForgotPassword, onRegister, onVerify }: EntryProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(true);
    const router = useRouter();
    const { setUser } = useContext(Context);
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                // Signed in
                const firebaseuser = await getUser(user.uid);
                if (firebaseuser) {
                    setUser({ ...firebaseuser.data(), id: firebaseuser.id });
                    if (firebaseuser.data().key) { onVerify() } else {
                        router.replace("/dashboard");
                    }
                }
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
                toast.error(
                    error.code === "auth/wrong-password"
                        ? t('notificationPage.incorrectpass')
                        : error.code === "auth/network-request-failed"
                            ? t('notificationPage.networkerror')
                            : error.code === "auth/user-not-found"
                                ? t('notificationPage.usernotfound')
                                : error.code === "auth/invalid-credential"
                                    ? t('notificationPage.incorrectemailorpassword')
                                    : t('overviewCategory.fielderror')
                );
                setLoading(false);
            });
    };

    return (
        <Description title={t('login.title')} arrow>
            <form className={styles.form} action="" onSubmit={(event) => onSubmit(event)}>
                <Field
                    className={styles.field}
                    label={t('login.mail')}
                    placeholder={t('login.typeemail')}
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t('login.password')}
                    placeholder={t("login.tpassword")}
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                />
                <div className={styles.line}>
                    <Checkbox
                        className={styles.checkbox}
                        label={t('login.remember')}
                        value={remember}
                        onChange={() => setRemember(!remember)}
                    />
                    <button type="button" className={styles.link} onClick={onForgotPassword}>
                        {t('login.forgot')}
                    </button>
                </div>
                <button type="submit" className={cn("button-wide", styles.button)} onClick={() => onSubmit}>
                    {loading ? t('overviewCategory.loading') + "..." : t('login.login')}
                </button>
                <div className={styles.foot}>
                    <div className={styles.text}>{t('login.noaccount')}</div>
                    <button type="button" className={styles.link} onClick={onRegister}>
                        {t('login.register')}
                    </button>
                </div>
            </form>
        </Description>
    );
};

export default Entry;
