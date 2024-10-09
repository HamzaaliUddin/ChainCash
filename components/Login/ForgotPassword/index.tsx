import { useState } from "react";
import styles from "./ForgotPassword.module.sass";
import ResetPassword from "./ResetPassword";
import CreatePassword from "./CreatePassword";
import PasswordSucessfully from "./PasswordSucessfully";

type ForgotPasswordProps = {
    onBack: () => void;
    onLogin: () => void;
};

const ForgotPassword = ({ onBack, onLogin }: ForgotPasswordProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <>
            {activeIndex === 0 && (
                <ResetPassword
                    onBack={onBack}
                    onContinue={() => setActiveIndex(1)}
                />
            )}
            {activeIndex === 1 && (
                <CreatePassword
                    onBack={() => setActiveIndex(0)}
                    onContinue={() => setActiveIndex(2)}
                />
            )}
            {activeIndex === 2 && <PasswordSucessfully onLogin={onLogin} />}
        </>
    );
};

export default ForgotPassword;
