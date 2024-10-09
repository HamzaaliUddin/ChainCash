import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import styles from "./Receive.module.sass";

import axios from "axios";
import getUsers from "pages/api/getUsers";
import updateUser from "pages/api/updateUser";
import { useTranslation } from "react-i18next";
import { Context } from "../Context/Context";

type ReceiveProps = {
    className?: string;
};

const Receive = ({ className }: ReceiveProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    const [allUser, setAllUser] = useState<any>([]);
    const [vaultAccount, setVaultAccount] = useState<any>([]);
    const { user } = useContext(Context);
    const { t } = useTranslation()

    const getVaultAccountsWithPageInfo = async () => {
        try {
            const accounts = await axios
                .get(`${process.env.NEXT_PUBLIC_URL}/getVaultAccountsWithPageInfo`)
                .then((res) => res.data);
            setVaultAccount(accounts.accounts);
        } catch (err) {
            console.error(err);
        }
    };

    const createFaucets = async () => {
        try {
            const currentUser = allUser.filter((i: any) => i?.wallet?.address === address)[0];
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/createTransaction`, {
                    assetId: "ETH_TEST3",
                    amount: "0.001",
                    srcId: "0",
                    address: address,
                    note: "Faucets Sent!",
                })
                .then((res) => res.data);
            getVaultAccountsWithPageInfo();
            updateUser(currentUser.id, {
                vaultAccount: vaultAccount.filter((i: any) => i.id === currentUser.vaultAccount.id)[0],
            });
        } catch (err) {
            console.error(err);
        }
    };

    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            setAllUser(users);
        } catch (err) {
            console.error(err);
        }
    };

    const kyc = async () => {
        try {
            const session = await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/session`, {
                    clientId: user?.clientId,
                    userId: user?.uid,
                    displayName: user?.displayName,
                })
                .then((res) => res.data);
            let popup = window.open(
                session?.redirectUrl,
                "ModalPopUp",
                "toolbar=no," +
                "scrollbars=no," +
                "location=no," +
                "statusbar=no," +
                "menubar=no," +
                "resizable=0," +
                "width=700," +
                "height=600"
            );

            popup?.focus();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsers();
        getVaultAccountsWithPageInfo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <button className={cn("button", className)} onClick={() => setVisibleModal(true)}>
                <Icon name="receive" />
                <span>{t('notificationPage.receive')}</span>
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <div
                    className={styles.info}
                    style={{
                        color: "#eec31a",
                    }}
                >
                    {t('kyc.completeKYC')}
                    <button style={{ color: "#eec31a", marginLeft: "6px", fontWeight: "bold" }} onClick={kyc}>
                        {t('kyc.verify')}

                    </button>
                </div>
                <div className={styles.title}>{t('notificationPage.receivefaucet')}</div>
                <Field
                    className={styles.field}
                    label={t('overviewCategory.recieveraddress')}
                    placeholder={t('overviewCategory.recieveraddress')}
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                    required
                />
                {user?.clientIdVerified === false ? (
                    <button
                        className={cn("button-wide", styles.button)}
                        style={{ backgroundColor: "red", cursor: "not-allowed", opacity: "70%" }}
                    >
                        {t("notificationPage.disabled")}
                    </button>
                ) : (
                    <button className={cn("button-wide", styles.button)} onClick={createFaucets}>
                        {t('overviewCategory.confirm')}
                    </button>
                )}
            </Modal>
        </>
    );
};

export default Receive;
