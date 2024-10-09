import { useContext, useEffect, useState } from "react";
import Card from "@/components/Card";
import cn from "classnames";
import { Context } from "../Context/Context";
import styles from "./SubAccount.module.sass";
import { useTranslation } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Toggle from "../Toggle";
import Field from "../Field";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const ConfigureSubAccount = () => {
    const { user, setUser } = useContext(Context);
    const { t } = useTranslation();
    const [flexDirection, setFlexDirection] = useState<FlexDirection>("column");
    const [open, setOpen] = useState<boolean>(false);
    const [subAccountInfo, setSubAccountInfo] = useState<any>(null);

    const [configdetails, setConfigDetails] = useState<any>({
        widthdrawState: false,
        perDayInterestState: false,
        finesState: false,
        autoAdvanceState: false,
        latePaymentFineState: "",
        autoAdvanceTypeState: "",
        autoAdvanceOptionState: "",
        bankSlipState: false,
        extraDueState: "",
        reprintExtraDueState: "",
        creditCardState: false,
        creditCardDescriptionState: "",
        creditCardInstallmentState: false,
        creditCardMaxInstallmentState: "",
        creditCardMaxInstallmentWithoutInterestState: "",
        creditCardTwoStepTransactionState: false,
        creditCardInstallmentInterestTransferState: false,
        paymentEmailNotification: false,
        paymentEmailNotificationDescription: "",
        earlyPaymentDiscount: false,
        earlyPaymentDiscountDays: "",
        earlyPaymentDiscountpercent: "",
        earlyPaymentDiscountValue: "",
        disabledWithdraw: false,
        customerMinimumBalance: ""
    })

    const getInfo = async () => {
        try {
            const response = await fetch("/api/subAccountInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            }).then(r =>r.json());
            setSubAccountInfo(response.iuguSubAccount);

            setConfigDetails({
                widthdrawState: !!response?.iuguSubAccount?.configuration?.auto_withdraw,
                perDayInterestState: !!response?.iuguSubAccount?.configuration?.per_day_interest,
                finesState: !!response?.iuguSubAccount?.configuration?.fines,
                autoAdvanceState: !!response?.iuguSubAccount?.configuration?.auto_advance,
                latePaymentFineState: response?.iuguSubAccount?.configuration?.late_payment_fine || "",
                autoAdvanceTypeState: response?.iuguSubAccount?.configuration?.auto_advance_type || "",
                autoAdvanceOptionState: response?.iuguSubAccount?.configuration?.auto_advance_option || "",
                bankSlipState: !!response?.iuguSubAccount?.configuration?.bank_slip?.active,
                extraDueState: response?.iuguSubAccount?.configuration?.bank_slip?.extra_due || "",
                reprintExtraDueState: response?.iuguSubAccount?.configuration?.bank_slip?.reprint_extra_due || "",
                creditCardState: !!response?.iuguSubAccount?.configuration?.credit_card?.active,
                creditCardDescriptionState: response?.iuguSubAccount?.configuration?.credit_card?.soft_descriptor || "",
                creditCardInstallmentState: !!response?.iuguSubAccount?.configuration?.credit_card?.installments,
                creditCardMaxInstallmentState: response?.iuguSubAccount?.configuration?.credit_card?.max_installments || "",
                creditCardMaxInstallmentWithoutInterestState: response?.iuguSubAccount?.configuration?.credit_card?.min_installments || "",
                creditCardTwoStepTransactionState: !!response?.iuguSubAccount?.configuration?.credit_card?.two_step_transaction,
                creditCardInstallmentInterestTransferState: !!response?.iuguSubAccount?.configuration?.credit_card?.installments_pass_interest,
                paymentEmailNotification: !!response?.iuguSubAccount?.configuration?.payment_email_notification,
                paymentEmailNotificationDescription: response?.iuguSubAccount?.configuration?.payment_email_notification_receiver || "",
                earlyPaymentDiscount: !!response?.iuguSubAccount?.configuration?.early_payment_discount,
                earlyPaymentDiscountDays: response?.iuguSubAccount?.configuration?.early_payment_discount_days || "",
                earlyPaymentDiscountpercent: response?.iuguSubAccount?.configuration?.early_payment_discount_percent || "",
                earlyPaymentDiscountValue: response?.iuguSubAccount?.early_payment_discounts?.[0]?.value_cents || "",
                disabledWithdraw: !!response?.iuguSubAccount?.configuration?.disabled_withdraw,
                customerMinimumBalance: response?.iuguSubAccount?.configuration?.customer_minimum_balance_cents || ""
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfo()
    }, [user])

    useEffect(() => {
        const updateFlexDirection = () => {
            setFlexDirection(window.innerWidth >= 330 ? "row" : "column");
        };
        updateFlexDirection();
        window.addEventListener("resize", updateFlexDirection);
        return () => {
            window.removeEventListener("resize", updateFlexDirection);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const configureAccount = async () => {
        try {
            const params = {
                bank_slip: {
                    active: configdetails?.bankSlipState,
                    extra_due: configdetails?.extraDueState,
                    reprint_extra_due: configdetails?.reprintExtraDueState
                },
                credit_card: {
                    active: configdetails?.creditCardState,
                    soft_descriptor: configdetails?.creditCardDescriptionState,
                    installments: configdetails?.creditCardInstallmentState,
                    max_installments: configdetails?.creditCardMaxInstallmentState,
                    max_installments_without_interest: configdetails?.creditCardMaxInstallmentWithoutInterestState,
                    two_step_transaction: configdetails?.creditCardTwoStepTransactionState,
                    installments_pass_interest: configdetails?.creditCardInstallmentInterestTransferState
                },
                "splits": [
                    {
                        "recipient_account_id": user?.iuguSubaccount?.account_id,
                        "cents": 212,
                        "percent": 12,
                        "bank_slip_cents": 1,
                        "bank_slip_percent": 1,
                        "credit_card_cents": 1,
                        "credit_card_percent": 2,
                        "pix_cents": 2,
                        "pix_percent": 3,
                        "permit_aggregated": false,
                        "credit_card_1x_cents": 1,
                        "credit_card_2x_cents": 1,
                        "credit_card_3x_cents": 1,
                        "credit_card_4x_cents": 1,
                        "credit_card_5x_cents": 1,
                        "credit_card_6x_cents": 1,
                        "credit_card_7x_cents": 1,
                        "credit_card_8x_cents": 1,
                        "credit_card_9x_cents": 1,
                        "credit_card_10x_cents": 1,
                        "credit_card_11x_cents": 1,
                        "credit_card_12x_cents": 1,
                        "credit_card_1x_percent": 1,
                        "credit_card_2x_percent": 2,
                        "credit_card_3x_percent": 2,
                        "credit_card_4x_percent": 2,
                        "credit_card_5x_percent": 3,
                        "credit_card_6x_percent": 3,
                        "credit_card_7x_percent": 3,
                        "credit_card_8x_percent": 3,
                        "credit_card_9x_percent": 3,
                        "credit_card_10x_percent": 3,
                        "credit_card_11x_percent": 3,
                        "credit_card_12x_percent": 3
                    }
                ],
                auto_withdraw: configdetails?.widthdrawState,
                payment_email_notification: configdetails?.paymentEmailNotification,
                payment_email_notification_receiver: configdetails?.paymentEmailNotificationDescription,
                early_payment_discount: configdetails?.earlyPaymentDiscount,
                early_payment_discounts: [
                    {
                        days: configdetails?.earlyPaymentDiscountDays,
                        percent: configdetails?.earlyPaymentDiscountpercent,
                        value_cents: configdetails?.earlyPaymentDiscountValue
                    }
                ],
                disabled_withdraw: configdetails?.disabledWithdraw,
                customer_minimum_balance_cents: configdetails?.customerMinimumBalance,
                per_day_interest: configdetails?.perDayInterestState,
                fines: configdetails?.finesState,
                late_payment_fine: configdetails?.latePaymentFineState,
                auto_advance: true,
                auto_advance_type: configdetails?.autoAdvanceTypeState,
                auto_advance_option: configdetails?.autoAdvanceOptionState
            };
            const response = await fetch("/api/configureIuguSubAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, params }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            // await updateDoc(doc(db, "chainCash", user?.id), {
            //     configureIuguSubaccount: data.iuguSubAccount,
            // });
            // setUser({
            //     ...user,
            //     configureIuguSubaccount: data.iuguSubAccount,
            // });
            // router.push("/dashboard");
            toast.success(t("dashboardPage.subAccount"));
            getInfo();
        } catch (error) {
            toast.error(t("dashboardPage.errorcreatingsubaccount"));
            console.error("Error creating sub-account:", error);
        }
    };

    return (
        <Card title={"Configure SubAccount"} tooltip="" onSeeMore={() => setOpen(!open)}>
            {open &&
                <div className={cn(styles.row, { [styles.rowColumn]: "" })}>
                    <div style={{ width: "100%" }}>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Toggle
                                className={styles.toggle}
                                title={"Auto Widthraw"}
                                value={configdetails.widthdrawState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    widthdrawState: !prevConfigDetails.widthdrawState
                                }))}
                            />
                            <Toggle
                                className={styles.toggle}
                                title={"Per Day Interest"}
                                value={configdetails.perDayInterestState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    perDayInterestState: !prevConfigDetails.perDayInterestState
                                }))}
                            />
                            <Toggle
                                className={styles.toggle}
                                title={"Fines"}
                                value={configdetails.finesState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    finesState: !prevConfigDetails.finesState
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Fine Value"}
                                placeholder={"Fine Value"}
                                value={configdetails.latePaymentFineState}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    latePaymentFineState: e.target.value
                                }))}
                                type="number"
                            />
                            <Toggle
                                className={styles.toggle}
                                title={"Auto Advance"}
                                value={configdetails.autoAdvanceState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    autoAdvanceState: !prevConfigDetails.autoAdvanceState
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Auto Advance Type"}
                                placeholder={"Auto Advance Type"}
                                value={configdetails.autoAdvanceTypeState}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    autoAdvanceTypeState: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Auto Advance Option"}
                                placeholder={"Auto Advance Option"}
                                value={configdetails.autoAdvanceOptionState}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    autoAdvanceOptionState: e.target.value
                                }))}
                                type="number"
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <p>Bank Slip</p>
                            <Toggle
                                className={styles.toggle}
                                title={"Bank Slip"}
                                value={configdetails.bankSlipState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    bankSlipState: !prevConfigDetails.bankSlipState
                                }))}
                            />
                            {configdetails.bankSlipState === true &&
                                <>
                                    <Field
                                        className={styles.field}
                                        label={"Extra Due"}
                                        placeholder={"Extra Due"}
                                        value={configdetails.extraDueState}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            extraDueState: e.target.value
                                        }))}
                                        type="number"
                                    />
                                    <Field
                                        className={styles.field}
                                        label={"Reprint Extra Due"}
                                        placeholder={"Reprint Extra Due"}
                                        value={configdetails.reprintExtraDueState}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            reprintExtraDueState: e.target.value
                                        }))}
                                        type="number"
                                    />
                                </>
                            }
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <p>Credit Card</p>
                            <Toggle
                                className={styles.toggle}
                                title={"Credit Card"}
                                value={configdetails.creditCardState}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    creditCardState: !prevConfigDetails.creditCardState
                                }))}
                            />
                            {configdetails.creditCardState === true &&
                                <>
                                    <Field
                                        className={styles.field}
                                        label={"Credit Card"}
                                        placeholder={"Credit Card"}
                                        value={configdetails.creditCardDescriptionState}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            creditCardDescriptionState: e.target.value
                                        }))}
                                    />
                                    <div style={{ marginTop: "10px" }}>
                                        <Toggle
                                            className={styles.toggle}
                                            title={"Credit Card Installment"}
                                            value={configdetails.creditCardInstallmentState}
                                            onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                                ...prevConfigDetails,
                                                creditCardInstallmentState: !prevConfigDetails.creditCardInstallmentState
                                            }))}
                                        />
                                    </div>
                                    <Field
                                        className={styles.field}
                                        label={"Maximum Installment"}
                                        placeholder={"Maximum Installment"}
                                        value={configdetails.creditCardMaxInstallmentState}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            creditCardMaxInstallmentState: e.target.value
                                        }))}
                                        type="number"
                                    />
                                    <Field
                                        className={styles.field}
                                        label={"Maximum Installment Without Interest"}
                                        placeholder={"Maximum Installment Without Interest"}
                                        value={configdetails.creditCardMaxInstallmentWithoutInterestState}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            creditCardMaxInstallmentWithoutInterestState: e.target.value
                                        }))}
                                        type="number"
                                    />
                                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>

                                        <Toggle
                                            className={styles.toggle}
                                            title={"Two Step Transaction"}
                                            value={configdetails.creditCardTwoStepTransactionState}
                                            onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                                ...prevConfigDetails,
                                                creditCardTwoStepTransactionState: !prevConfigDetails.creditCardTwoStepTransactionState
                                            }))}
                                        />
                                        <Toggle
                                            className={styles.toggle}
                                            title={"Installment Interest Transfer"}
                                            value={configdetails.creditCardInstallmentInterestTransferState}
                                            onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                                ...prevConfigDetails,
                                                creditCardInstallmentInterestTransferState: !prevConfigDetails.creditCardInstallmentInterestTransferState
                                            }))}
                                        />
                                    </div>
                                </>
                            }
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <Toggle
                                className={styles.toggle}
                                title={"Payment Email Notification"}
                                value={configdetails.paymentEmailNotification}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    paymentEmailNotification: !prevConfigDetails.paymentEmailNotification
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Payment Email Notification"}
                                placeholder={"Payment Email Notification"}
                                value={configdetails.paymentEmailNotificationDescription}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    paymentEmailNotificationDescription: e.target.value
                                }))}
                            />
                            <div style={{ marginTop: "10px" }}>
                                <Toggle
                                    className={styles.toggle}
                                    title={"Early Payment Discount"}
                                    value={configdetails.earlyPaymentDiscount}
                                    onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                        ...prevConfigDetails,
                                        earlyPaymentDiscount: !prevConfigDetails.earlyPaymentDiscount
                                    }))}
                                />
                            </div>
                            {configdetails.earlyPaymentDiscount === true &&
                                <>
                                    <Field
                                        className={styles.field}
                                        label={"Early Payment Discount Days"}
                                        placeholder={"Early Payment Discount Days"}
                                        value={configdetails.earlyPaymentDiscountDays}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            earlyPaymentDiscountDays: e.target.value
                                        }))}
                                        type="number"
                                    />
                                    <Field
                                        className={styles.field}
                                        label={"Early Payment Discount Percent"}
                                        placeholder={"Early Payment Discount Percent"}
                                        value={configdetails.earlyPaymentDiscountpercent}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            earlyPaymentDiscountpercent: e.target.value
                                        }))}
                                        type="number"
                                    />
                                    <Field
                                        className={styles.field}
                                        label={"Early Payment Discount Value (Cents)"}
                                        placeholder={"Early Payment Discount Value (Cents)"}
                                        value={configdetails.earlyPaymentDiscountValue}
                                        onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                            ...prevConfigDetails,
                                            earlyPaymentDiscountValue: e.target.value
                                        }))}
                                        type="number"
                                    />
                                </>
                            }
                            <Toggle
                                className={styles.toggle}
                                title={"Disabled Withdraw"}
                                value={configdetails.disabledWithdraw}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    disabledWithdraw: !prevConfigDetails.disabledWithdraw
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Customer Minimum Balance"}
                                placeholder={"Customer Minimum Balance"}
                                value={configdetails.customerMinimumBalance}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    customerMinimumBalance: e.target.value
                                }))}
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <button
                                style={{
                                    background: "#23978D",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    borderRadius: "10px",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    color: "white",
                                }}
                                onClick={configureAccount}
                            >
                                Configure Account
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Card>
    );
};

export default ConfigureSubAccount;
