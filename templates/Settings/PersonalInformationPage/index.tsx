import { useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import styles from "./PersonalInformationPage.module.sass";
import Layout from "@/components/Layout";
import taxValidator from "tax-id-validator";
import { cnpj, cpf } from "cpf-cnpj-validator";
import Settings from "@/components/Settings";
import Field from "@/components/Field";
import DatePicker from "@/components/DatePicker";
import Select from "@/components/Select";
import PhotoProfile from "./PhotoProfile";
import { Context } from "@/components/Context/Context";
import updateUser from "pages/api/updateUser";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";

type PersonalInformationPageProps = {};

const PersonalInformationPage = ({ }: PersonalInformationPageProps) => {
    const { user, setUser } = useContext(Context);

    const timestampSeconds = user?.dateOfBirth?.seconds || Date.now() / 1000;
    const milliseconds = timestampSeconds * 1000;
    const date = new Date(milliseconds || "");
    const { t } = useTranslation();

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
    const [startDate, setStartDate] = useState<any>(date);
    const [name, setName] = useState<string>(user?.displayName || "");
    const [taxId, setTaxId] = useState<string>(user?.taxId || "");
    const [error, setError] = useState<string>("");
    const [lname, setLName] = useState<string>(user?.lname || "");
    const [userName, setUserName] = useState<string>(user?.userName || "");
    const [email, setEmail] = useState<string>(user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone || "");
    const [nationality, setNationality] = useState<string>(user?.nationality || "");
    const [CPF, setCPF] = useState<string>(user?.CPF || "");
    const [CNPJ, setCNPJ] = useState<string>(user?.CNPJ || "");
    const [address, setAddress] = useState<string>(user?.address || "");
    const [loading, setLoading] = useState<boolean>(false);
    const breadcrumbs = [
        {
            title: t("dashboardPage.settings"),
            url: "/settings",
        },
        {
            title: t("settingsPage.personalinformation"),
        },
    ];
    const options = useMemo(
        () =>
            countryList()
                .getData()
                .map((a: any) => ({ ...a, label: a.title || a.label, title: a.title || a.label })),
        []
    );
    const handleChangeUserType = (value: string) => setUserTypes(value);

    const router = useRouter();

    const updateDetails = async () => {
        try {
            if (error) return;
            setLoading(true);
            if (!name || !lname || !userName || !email || !phoneNumber || !nationality || !userType || !address || !startDate) {
                setLoading(false);
                toast.error("Fill all fields")
                return;
            }
            setUser((pre: any) => ({
                ...pre,
                displayName: name,
                dateOfBirth: startDate,
                userName: userName,
                taxId,
                nationality: nationality,
                phone: phoneNumber,
                userTypes: userTypes,
                CPF: CPF,
                CNPJ: CNPJ,
                address: address,
            }));
            await updateUser(user?.id, {
                displayName: name,
                userName: userName,
                dateOfBirth: startDate,
                nationality: nationality,
                phone: phoneNumber,
                userTypes,
                CPF: CPF,
                CNPJ: CNPJ,
                address: address,
                taxId,
            });
            toast.success(t("settingsPage.updatesuccessful"));
            setLoading(false);
            router.replace("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error(t("overviewCategory.fielderror"));
            setLoading(false);
        }
    };

    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs}>
            <Settings title={t("settingsPage.personalinformation")} tooltip="">
                <PhotoProfile />
                <Field
                    className={styles.field}
                    label={t("registerPage.fName")}
                    placeholder={t("registerPage.fName")}
                    // value={name}
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("registerPage.lName")}
                    placeholder={t("registerPage.lName")}
                    // value={lname}
                    value={lname}
                    onChange={(e: any) => setLName(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label={t("settingsPage.username")}
                    placeholder={t("settingsPage.username")}
                    // value={userName}
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
                    onChange={(e: any) => setEmail(user?.email)}
                    disabled
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
                        country={"us"}
                        // value={phoneNumber}
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
                <div style={{ position: "relative", marginBottom: 24, height: 80, width: "100%", background: "white" }}>
                    <div
                        style={{ position: "absolute", width: "100%", height: "470px", overflowY: "scroll" }}
                        className="selectscroll"
                    >
                        <Select
                            className={styles.select}
                            label={t("settingsPage.nationality")}
                            // value={nationality}
                            value={nationality}
                            onChange={setNationality}
                            options={options}
                            style={{
                                marginBottom: "20px",
                            }}
                            searchOptions
                        />
                    </div>
                </div>
                {nationality !== "BR" ? (
                    <Field
                        className={styles.field}
                        label="Tax Id"
                        placeholder={"Enter Tax Id"}
                        type="text"
                        // value={taxId}
                        value={taxId}
                        onChange={async (e: any) => {
                            const valid = taxValidator.validate(e.target.value);
                            if (!valid) {
                                setError("Tax ID is not valid!");
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
                                // value={CPF}
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
                                // value={CNPJ}
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
                <div style={{ position: "relative", zIndex: 8, marginBottom: 24, width: "100%" }}>
                    <Select
                        className={styles.select}
                        label={t("settingsPage.user type")}
                        // value={userTypes}
                        value={userTypes}
                        onChange={handleChangeUserType}
                        options={userType}
                        style={{ marginBottom: "20px" }}
                    />
                </div>

                {error && (
                    <p style={{ color: "red", fontSize: "16px", marginBottom: "12px", marginTop: "-20px" }}>{error}</p>
                )}
                <Field
                    className={styles.field}
                    label={t("commodityCategory.address")}
                    placeholder={t("overviewCategory.typeaddress")}
                    type="text"
                    value={address}
                    // value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                    required
                />
                <DatePicker
                    className={styles.field}
                    label={t("settingsPage.date of birth")}
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    dateFormat="MM - dd - yyyy"
                    icon
                />
                <div className={styles.btns}>
                    <button className={cn("button-stroke", styles.button)} onClick={() => router.replace("/dashboard")}>
                        {t("settingsPage.back")}
                    </button>
                    <button className={cn("button", styles.button)} onClick={updateDetails}>
                        {loading ? t("overviewCategory.loading") + "..." : t("settingsPage.update")}
                    </button>
                </div>
            </Settings>
        </Layout>
    );
};

export default PersonalInformationPage;
