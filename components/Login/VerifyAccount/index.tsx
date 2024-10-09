import { Context } from "@/components/Context/Context";
import cn from "classnames";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Description from "../Description";
import styles from "./VerifyAccount.module.sass";
import { toast } from "react-toastify";
import { exportKey, generateKey, getKeyUri, importKey, SecretKey, totp } from "otp-io";
import { hmac, randomBytes } from "otp-io/crypto";
import Image from "next/image";
import QRCode from 'qrcode';
import Field from "@/components/Field";
import updateUser from "pages/api/updateUser";

type VerifyAccountProps = {
  onBack: () => void;
  onVerify: () => void;
  verify: string | boolean;
};


const VerifyAccount = ({ onBack, onVerify, verify }: VerifyAccountProps) => {
  const { user } = useContext<any | any[] | null | undefined>(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const { t } = useTranslation();
  const isRegister = !user?.key || verify === "register";
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const code = await totp(hmac, { secret: key })
      const newKey = await exportKey(key);
      if (code === input) {
        await updateUser(user.id, {
          key: newKey,
        });
        setLoading(false);
        toast.success(t('twofactorpage.2faauthentsuccess'))
        onVerify()
        router.push('/dashboard')
        return;
      }
      setLoading(false);
      toast.error(t('twofactorpage.invalidauthent'));
    } catch (error: any) {
      console.error(error.code);
      console.error(error.message);
      toast.error(
        error.code === "auth/network-request-failed"
          ? t('notificationPage.networkerror')
          : t('overviewCategory.fielderror')
      );
      setLoading(false);
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
      if (isRegister) {
        // 4. Get key import url
        const url = getKeyUri({
          type: "totp",
          secret: key,
          name: user.userName,
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
      setLoading(false);
    }
  }

  const skipMfa = () => {
    onVerify()
    router.push('/dashboard')
  }

  useEffect(() => {
    getTwoStepVerification();
    // eslint-disable-next-line
  }, [])

  return (
    <Description
      title={t('twofactorpage.2faauthent')}
      info={""}
      onBack={onBack}
    >
      <div style={{ alignItems: "center", display: 'flex', flexDirection: "column", }}>
        {isRegister && imageUrl && <Image src={imageUrl} alt="" width={300} height={300} />}
        <form
          className={styles.form}
          onSubmit={(event) => onSubmit(event)}
        >

          <Field onChange={(e: any) => setInput(e.target.value)}
            className={styles.field}
            value={input}
            required
            label={t('twofactorpage.2facode')}
            placeholder={t('twofactorpage.enter2fa')}
          />

          <button className={cn("button-wide", styles.button)} type="submit">
            {loading ? t('overviewCategory.loading') + "..." : t("registerPage.continue")}
          </button>
          {!user?.key && (
            <button className={cn("button-wide", styles.button)} onClick={skipMfa}>
              Skip for now
            </button>
          )}
        </form>
      </div>
    </Description>
  );
};

export default VerifyAccount;
