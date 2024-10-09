import { useState } from "react";
import cn from "classnames";
import styles from "./ResetPassword.module.sass";
import Description from "../../Description";
import Field from "@/components/Field";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'
import getUsers from "pages/api/getUsers";

type ResetPasswordProps = {
  onBack?: () => void;
  onContinue?: () => void;
};

const ResetPassword = ({ onBack }: ResetPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation()

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const users = await getUsers();
    const userExists = !!users?.find((user: any) => user?.email === email);
    if (userExists) {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        toast(t('words.passwordresetdesc') + "!");
        setLoading(false);
        onBack && onBack();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(error.message);
        setLoading(false);
      });
    } else {
      toast.error("User doesn't exists!")
    }
  };

  return (
    <Description
      title={t('forgotPassPage.title')}
      info={t('forgotPassPage.desc')}
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
          label={t("login.mail")}
          placeholder={t('login.typeemail')}
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <button
          className={cn("button-wide", styles.button)}
          onClick={(event) => onSubmit(event)}
        >
          {loading ? t('overviewCategory.loading') + "..." : t("registerPage.continue")}
        </button>
      </form>
    </Description>
  );
};

export default ResetPassword;
