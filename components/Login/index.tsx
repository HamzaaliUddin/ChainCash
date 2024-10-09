import { useState } from "react";
import styles from "./Login.module.sass";
import Entry from "./Entry";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import VerifyAccount from "./VerifyAccount";

type LoginProps = {};

const Login = ({ }: LoginProps) => {
    const [login, setLogin] = useState<boolean>(true);
    const [password, setPassword] = useState<boolean>(false);
    const [verify, setVerify] = useState<boolean | string>(false);

    return (
        <div className={styles.login}>
            {password ? (
                <ForgotPassword
                    onBack={() => setPassword(false)}
                    onLogin={() => setPassword(false)}
                />
            ) : login ? (
                <Entry
                    onForgotPassword={() => setPassword(true)}
                    onVerify={() => { setVerify("login"); setLogin(false) }}
                    onRegister={() => { setVerify(false); setLogin(false) }}
                />
            ) : verify ? (
                <VerifyAccount
                    onBack={() => setLogin(true)} verify={verify} onVerify={() => setLogin(true)} />
            ) : (
                <CreateAccount
                    onLogin={() => setLogin(true)}
                    onBack={() => setLogin(true)}
                    onRegister={() => setVerify("register")}
                />
            )}
        </div>
    );
};

export default Login;
