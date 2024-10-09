import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SecurityPage.module.sass";
import Layout from "@/components/Layout";
import Settings from "@/components/Settings";
import Field from "@/components/Field";
import { auth } from "@/utils/firebase";
import { signOut, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Context } from "@/components/Context/Context";
import { SecretKey, exportKey, generateKey, getKeyUri, importKey, totp } from "otp-io";
import QRCode from 'qrcode';
import { hmac, randomBytes } from "otp-io/crypto-web";
import Image from "next/image";
import updateUser from "pages/api/updateUser";

type SecurityPageProps = {};

const SecurityPage = ({ }: SecurityPageProps) => {
    const { t } = useTranslation()
    const { user, setUser } = useContext(Context)
    const [imageUrl, setImageUrl] = useState<string>('');
    const [remove2fa, setRemove2fa] = useState<boolean>(false);
    const [key, setKey] = useState<any>(user?.key || "");
    const breadcrumbs = [
        {
            title: t("dashboardPage.settings"),
            url: "/settings",
        },
        {
            title: t('settingsPage.security'),
        },
    ];
    const [newPassword, setNewPassword] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const router = useRouter();

    const signout = (event: any) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    const handlePasswordChange = async () => {
        if (newPassword !== repeatPassword) {
            return;
        }

        if (!input && !user?.key) return;

        try {
            if (auth.currentUser && !user?.key) {
                const code = await totp(hmac, { secret: key })
                const newKey = await exportKey(key);
                if (code === input) {
                    await updateUser(user?.uid, {
                        key: newKey,
                    });
                    setUser((pre: any) => ({ ...pre, key: newKey }))
                }
            }

            if (auth.currentUser) {
                if (remove2fa) {
                    setUser((pre: any) => ({ ...pre, key: null }));
                    await updateUser(user?.uid, {
                        key: null,
                    })
                }
                await updatePassword(auth.currentUser, newPassword);
                signout(event);
                toast("Settings changed successfully");
                router.replace("/login");
                return;
            }
        } catch (error: any) {
            console.error("Error changing password:", error);
            toast.error(error.message);
        }
    };
    const getTwoStepVerification = async () => {
        try {
            let key: SecretKey;
            if (user.key) {
                key = await importKey(user.key);
            } else {
                key = generateKey(randomBytes, /* bytes: */ 20); // 5-20 good for Google Authenticator
            }
            setKey(key);
            if (!user?.key) {
                // 4. Get key import url
                const url = getKeyUri({
                    type: "totp",
                    secret: key,
                    name: user.displayName,
                    issuer: "ChainCash"
                });

                QRCode.toDataURL(url, function (err: any, data: any) {
                    if (!err) {
                        setImageUrl(data);
                    }

                    console.log(err)
                })
            }
        } catch (error: any) {
            console.error(error.code);
            console.error(error.message);
            toast.error(
                error.code === "auth/network-request-failed"
                    ? t('notificationPage.networkerror')
                    : t('overviewCategory.fielderror')
            );
        }
    }

    useEffect(() => {
        getTwoStepVerification();
    }, [user])

    return (
        <Layout
            title={`${user?.displayName} 👏🏻`}
            breadcrumbs={breadcrumbs}>
            <Settings title={t('settingsPage.security')} tooltip="">
                <div style={{ marginBottom: 10 }}>
                    <h4>{t('twofactorpage.2faauthent')}</h4>
                    {user?.key ? <div className="flex items-center justify-center" style={{ gap: '16px' }}>
                        <h2>Disable Two Factor Authentication ?</h2>
                        <button onClick={() => setRemove2fa(!remove2fa)} style={{ background: remove2fa ? 'rgb(39, 141, 122)' : "transparent", border: "1px solid black", color: 'black', borderRadius: '6px', padding: '4px 16px' }}>Yes</button>
                    </div> : (
                        <>
                            {imageUrl && <Image src={imageUrl} alt="" width={250} height={250} />}
                            <Field
                                className={styles.field}
                                label={t('twofactorpage.2facode')}
                                type="password"
                                placeholder={t('twofactorpage.enter2fa')}
                                value={input}
                                onChange={(e: any) => setInput(e.target.value)}
                                required
                            />
                        </>
                    )}
                </div>
                <Field
                    className={styles.field}
                    label={t('settingsPage.newpassword')}
                    type="password"
                    placeholder={t('settingsPage.typenewpass')}
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t('settingsPage.repeatnewpass')}
                    type="password"
                    placeholder={t('settingsPage.typenewpass')}
                    value={repeatPassword}
                    onChange={(e: any) => setRepeatPassword(e.target.value)}
                    required
                />
                <div className={styles.btns}>
                    <button className={cn("button-stroke", styles.button)}>{t('adminPage.cancel')}</button>
                    <button className={cn("button", styles.button)} onClick={handlePasswordChange}>
                        {t('settingsPage.yes')}
                    </button>
                </div>
            </Settings>
        </Layout>
    );
};

export default SecurityPage;
