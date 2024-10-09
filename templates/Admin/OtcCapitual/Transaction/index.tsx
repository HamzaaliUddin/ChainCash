import cn from "classnames";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { db } from "../../../../utils/firebase";
import styles from "./Transaction.module.sass";
import { getTradesConfirm, getTradesQuotation } from "@/utils/capitual";
import axios from "axios";
import { toast } from "react-toastify";
import addDepositRequest from "pages/api/addDepositRequest";

type TransactionType = {
  user: any;
  price: string;
  quantity: string;
  data: any;
};

type TransactionProps = {
  item: TransactionType;
  value: any;
  onChange: any;
  getDepositReq: any;
};

const Transaction = ({
  item,
  getDepositReq,
}: TransactionProps) => {
  const { t } = useTranslation();

  const updateTransaction = async (status: any) => {

    const { user, price, data } = item;

    const { quote_id } = await getTradesQuotation(data.coin);
    const order = await getTradesConfirm(quote_id, price);

    const createInvoice = await axios
      .post("/api/createIuguSession", {
        cpf: user?.CPF || "",
        cnpj: user?.CNPJ || "",
        username: user?.userName || "",
        email: user?.email || "",
        price,
        quantity: data.amount,
        isAllowed: true,
        order
      })
      .then((r) => r.data);

    if (createInvoice.errors) {
      return toast.error(t("overviewCategory.fielderror"));
    }

    toast.success("Please check your email for invoice details");

    let interval = setInterval(async () => {
      const iuguSessions = await axios.get("/api/getIuguSessions").then((r) => r.data);
      const currentSession = iuguSessions.find((i: any) => i.id === createInvoice.id);
      if (currentSession && currentSession?.status === "paid") {
        await addDepositRequest({ ...data, order });
        toast.success(t("overviewCategory.requestsent"));
        clearInterval(interval);
      }
    }, 5000);
  };

  return (
    <>
      <div className={cn(styles.transaction)}>
        <div className={styles.head}>
          <div
            className={styles.cell}
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div className={styles.name}>{"Oder Id"}</div>
          </div>
          <div
            className={styles.cell}
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div className={styles.name}>
              {item.user.username}
            </div>
          </div>
          <div
            className={styles.cell}
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div className={styles.name}>{"value requested"}</div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.status}>{"our quote"}</div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.status}>{"our commision"}</div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className={cn(
                // {
                //   [styles.success]: item?.status === "Success",
                //   [styles.pending]: item?.status === "Pending",
                //   [styles.canceled]: item?.status === "Canceled",
                // },
                styles.status
              )}
            >
              {/* {t(`adminPage.${item.status.toLowerCase()}`)} */}

              {"Status"}
            </div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={() => updateTransaction("Confirm")}
              style={{
                marginLeft: "8px",
                fontWeight: "bold",
                backgroundColor: "#23978D",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                padding: "8px",
              }}
            >
              {t('adminPage.approve')}
            </button>
            {/* <button
              // onClick={() => updateTransaction("Canceled")}
              style={{
                marginLeft: "8px",
                fontWeight: "bold",
                color: "#FF0000",
                border: "1px solid",
                borderRadius: "5px",
                padding: "8px",
              }}
            >
              {t('adminPage.cancel')}
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
