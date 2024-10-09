import cn from "classnames";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { db } from "../../../../utils/firebase";
import styles from "./Transaction.module.sass";

type TransactionType = {
  typeTransaction: string;
  date: string;
  time: string;
  amount: string;
  status: string;
  assetId: string;
  destinationAddress: string;
  sourceAddress: string;
  createdAt: string;
  id: any;
  request: any;
  coin: any;
  dueDate: any;
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
    await updateDoc(doc(db, "Deposit", item?.id), { status });
    await getDepositReq();
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
            <div className={styles.name}>{`${item?.coin.split("_")[0]}`}</div>
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
              {`${item?.request?.slice(0, 6)}...${item?.request?.slice(
                item?.request?.length - 6,
                item?.request?.length
              )}`}
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
            <div className={styles.name}>{`${item?.amount}`}</div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.status}>{`${item?.dueDate}`}</div>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={() => updateTransaction("Success")}
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
            <button
              onClick={() => updateTransaction("Canceled")}
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
            </button>
          </div>
          <div
            className={styles.cell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className={cn(
                {
                  [styles.success]: item?.status === "Success",
                  [styles.pending]: item?.status === "Pending",
                  [styles.canceled]: item?.status === "Canceled",
                },
                styles.status
              )}
            >
              {t(`adminPage.${item.status.toLowerCase()}`)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
