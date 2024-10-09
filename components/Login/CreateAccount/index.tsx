import Checkbox from "@/components/Checkbox";
import { Context } from "@/components/Context/Context";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { auth } from "@/utils/firebase";
import axios from "axios";
import cn from "classnames";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import addUser from "pages/api/addUser";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import Description from "../Description";
import styles from "./CreateAccount.module.sass";
import taxValidator from "tax-id-validator";

type CreateAccountProps = {
    onBack: () => void;
    onRegister: () => void;
    onLogin: () => void;
};

const CreateAccount = ({ onBack, onLogin, onRegister }: CreateAccountProps) => {
    const [name, setName] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [repassword, setRePassword] = useState<string>("");
    const [CPF, setCPF] = useState<string>("");
    const [nationality, setNationality] = useState<string>("US");
    const [checked, setChecked] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<any>("");
    const [CNPJ, setCNPJ] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [taxId, setTaxId] = useState<string>("");
    const { setUser } = useContext<any | any[] | null | undefined>(Context);
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const options = useMemo(
        () =>
            countryList()
                .getData()
                .map((a: any) => ({ ...a, label: a.title || a.label, title: a.title || a.label })),
        []
    );

    const userType = [
        {
            title: t("settingsPage.individual"),
            value: "individual",
        },
        {
            title: t("settingsPage.business"),
            value: "business",
        },
    ];
    const [userTypes, setUserTypes] = useState<string>(userType[0].value);

    const handleChangeUserType = (value: string) => {
        setUserTypes(value);
        setError("");
    };

    const emailConfirmation = async (to: string, id: any) => {
        try {
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/confirmEmail`, {
                    to,
                    id,
                })
                .then((res) => res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (password !== repassword) {
            toast.error(t("registerPage.passNotMatch"));
            setLoading(false);
            return;
        }

        // if (password != repassword) {
        //     toast.error(t("registerPage.passNotMatch"));
        //     setLoading(false);
        //     return;
        // }

        if (error) return;

        if (!checked) {
            toast.error('Please accept the terms of use.');
            setLoading(false);
            return;
        }
        // if (!email.endsWith('@gmail.com')) {
        //     toast.error('Please use a valid Gmail address.');
        //     setLoading(false); 
        //     return; 
        // }

        if (password.length < 6 || !specialCharacterRegex.test(password)) {
            toast.error('Password must be at least 6 characters long and contain at least one special character.');
            setLoading(false);
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }: any) => {
                const createClient = await axios
                    .post(`${process.env.NEXT_PUBLIC_URL}/createClient`, {
                        email: email,
                        firstName: name,
                        lastName: lname,
                    })
                    .then((res) => res.data);
                await addUser({
                    accessToken: user?.accessToken,
                    displayName: name,
                    userName: userName,
                    nationality: nationality,
                    phone: phoneNumber,
                    userTypes: userTypes,
                    CPF: CPF,
                    CNPJ: CNPJ,
                    lname: lname,
                    email: email,
                    key: false,
                    emailVerified: false,
                    freezeType: false,
                    reloadUserInfo: user?.reloadUserInfo,
                    uid: user?.uid,
                    clientId: createClient?.id,
                    clientIdVerified: false,
                    taxId,
                    agreeToTerms: checked,
                    userLocation,
                    tier: "3.5",
                }).then(async function sendEmail(user) {
                    try {
                        await emailConfirmation(email, user.uid);
                        setUser(user);
                    } catch (error) {
                        console.log(error);
                    }
                });
                toast.success(t("words.userregdesc"));
                onRegister();
            })
            .catch((error: any) => {
                console.error(error.code);
                console.error(error.message);
                toast.error(t("overviewCategory.fielderror"));
                setLoading(false);
            });
    };

    const getUserLocationData = async () => {
        try {
            const { data } = await axios.get("https://api.ipdata.co/?api-key=82521dc0ecf33753c9e40c3e032a4dab505ba43fa9e9403e1647bb38");
            setUserLocation(data);
        } catch (error: any) {
            console.log(error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        getUserLocationData();
    }, []);

    return (
        <Description title={t("registerPage.title")} info={t("registerPage.subTitle")} onBack={onBack}>
            <form className={styles.form} action="" onSubmit={(event) => onSubmit(event)}>
                <Field
                    className={styles.field}
                    label={t("registerPage.fName")}
                    placeholder={t("words.typefname")}
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("registerPage.lName")}
                    placeholder={t("words.typelname")}
                    value={lname}
                    onChange={(e: any) => setLname(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("settingsPage.username")}
                    placeholder={t("words.typeusername")}
                    value={userName}
                    onChange={(e: any) => setUserName(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("login.mail")}
                    placeholder={t("login.typeemail")}
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("login.password")}
                    placeholder={t("login.tpassword")}
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("registerPage.rewritePass")}
                    placeholder={t("login.tpassword")}
                    type="password"
                    value={repassword}
                    onChange={(e: any) => setRePassword(e.target.value)}
                    required
                />
                {/* <Field
          className={styles.field}
          label={t('settingsPage.phonenumber')}
          placeholder={t('notificationPage.typephonenumber')}
          type="number"
          value={phoneNumber}
          onChange={(e: any) => setPhoneNumber(e.target.value)}
          required
        /> */}
                <div style={{ position: "relative", zIndex: 10, marginBottom: 24, width: "100%" }}>
                    <PhoneInput
                        containerStyle={{ width: "100%" }}
                        inputStyle={{ width: "100%", paddingTop: "30px", paddingBottom: "30px" }}
                        country={nationality.toLowerCase()}
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                        alwaysDefaultMask
                        autoFormat
                        autocompleteSearch
                        placeholder={t("notificationPage.typephonenumber")}
                        countryCodeEditable
                        enableAreaCodes
                        enableSearch
                        enableClickOutside
                    />
                </div>
                {/* <Field
          className={styles.field}
          label={t('settingsPage.nationality')}
          placeholder={t('words.typenational')}
          type="text"
          value={nationality}
          onChange={(e: any) => setNationality(e.target.value)}
          required
        /> */}
                <div style={{ position: "relative", zIndex: 9, marginBottom: 24, width: "100%" }}>
                    <Select
                        className={styles.select}
                        label={t("settingsPage.nationality")}
                        value={nationality}
                        onChange={setNationality}
                        options={options}
                        style={{
                            marginBottom: "20px",
                        }}
                        searchOptions
                    />
                </div>
                <div style={{ position: "relative", zIndex: 8, marginBottom: 24, width: "100%" }}>
                    <Select
                        className={styles.select}
                        label={t("settingsPage.user type")}
                        value={userTypes}
                        onChange={handleChangeUserType}
                        options={userType}
                        style={{ marginBottom: "20px" }}
                    />
                </div>
                {nationality !== "BR" ? (
                    <Field
                        className={styles.field}
                        label={t("words.taxId")}
                        placeholder={t("words.entertaxid")}
                        type="text"
                        value={taxId}
                        onChange={async (e: any) => {
                            const valid = taxValidator.validate(e.target.value);
                            if (!valid) {
                                setError(t("words.taxidisnotvalid") + "!");
                            } else {
                                setError("");
                            }
                            setTaxId(e.target.value);
                        }}
                        required
                    />
                ) : (
                    <>
                        {userTypes === userType[0].value ? (
                            <Field
                                className={styles.field}
                                label="CPF"
                                placeholder={t("notificationPage.typecpf")}
                                type="text"
                                value={CPF}
                                onChange={(e: any) => {
                                    const valid = cpf.isValid(e.target.value);
                                    if (!valid) {
                                        setError(t("words.cpfisnotvalid") + "!");
                                    } else {
                                        setError("");
                                    }
                                    setCPF(cpf.format(e.target.value));
                                }}
                                required
                            />
                        ) : (
                            <Field
                                className={styles.field}
                                label="CNPJ"
                                placeholder={t("notificationPage.typecnjp")}
                                type="text"
                                value={CNPJ}
                                onChange={(e: any) => {
                                    const valid = cnpj.isValid(e.target.value);
                                    if (!valid) {
                                        setError(t("words.cnjpisnotvalid") + "!");
                                    } else {
                                        setError("");
                                    }
                                    setCNPJ(cnpj.format(e.target.value));
                                }}
                                required
                            />
                        )}
                    </>
                )}

                {error && (
                    <p style={{ color: "red", fontSize: "16px", marginBottom: "12px", marginTop: "-20px" }}>{error}</p>
                )}
                <Checkbox
                    className={styles.field}
                    label={
                        <p>
                            I agree to the{" "}
                            <Link href="/terms-of-use" style={{ color: "#31b099" }}>
                                terms of use
                            </Link>
                        </p>
                    }
                    value={checked}
                    onChange={(e: any) => {
                        setChecked(e.target.checked);
                    }}
                />
                <button className={cn("button-wide", styles.button)} type="submit">
                    {loading ? t("overviewCategory.loading") + "..." : t("registerPage.continue")}
                </button>
                <div className={styles.foot}>
                    <div className={styles.text}>{t("registerPage.hasAccount")}</div>
                    <button type="button" className={styles.link} onClick={onLogin}>
                        {t("login.login")}
                    </button>
                </div>
            </form>
        </Description>
    );
};

export default CreateAccount;
