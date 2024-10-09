import { Context } from "@/components/Context/Context";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { storage } from "@/utils/firebase";
import cn from "classnames";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import updateUser from "pages/api/updateUser";
import { useContext, useEffect, useState } from "react";
import styles from "./PhotoProfile.module.sass";
import { useTranslation } from "react-i18next";
import Loader from "pages/Loader";

type PhotoProfileProps = {};

const PhotoProfile = ({ }: PhotoProfileProps) => {
    const [loader, setLoader] = useState(true);
    const { user, setUser } = useContext(Context);
    const { t } = useTranslation()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setLoader(false);
            return;
        }
        setLoader(true);
        if (!file.type.startsWith('image/')) {
            console.error('Please select an image file.');
            setLoader(false);
            return;
        }

        const fileRef = ref(storage, file.name);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        setUser((pre: any) => ({ ...pre, photoURL: url }));
        updateUser(user?.id, {
            photoURL: url,
        });
    };
    return (
        <div className={styles.photo}>
            <div className={styles.label}>{t('settingsPage.photoprofile')}</div>
            <div className={styles.row}>
                <div className={styles.avatar}>
                    {/* {user?.photoURL ? (
                        <Image src={user?.photoURL} fill style={{ objectFit: "cover" }} alt="Avatar" />
                    ) : (
                        <Icon name="user" size="32" />
                    )} */}
                    {user?.photoURL && loader &&
                        <div style={{ position: 'relative', zIndex: 10 }}><Loader height={20} width={20} /></div>
                    }
                    {user?.photoURL ? (
                        <Image onLoad={() => {
                            setLoader(false)
                        }} src={user?.photoURL} fill style={{ objectFit: 'cover', opacity: loader ? "0" : '100' }} onLoadStart={() => setLoader(true)} alt="Avatar" />

                    ) : (
                        <Icon name="user" size="32" />
                    )}
                </div>
                <div className={styles.file}>
                    <button className={cn("button", styles.button)}>
                        {t('settingsPage.upload image')}
                        <input className={styles.input} type="file" onChange={handleUpload} accept="image/png, image/jpeg, image/jpg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoProfile;
