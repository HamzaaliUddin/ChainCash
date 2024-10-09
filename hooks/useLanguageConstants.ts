import { useTranslation } from "react-i18next";

export default function useLanguageConstants() {
  const { t } = useTranslation();
  const durationOptions = [
    {
      title: t("overviewCategory.monthly"),
      value: "monthly",
    },
    {
      title: t("overviewCategory.annually"),
      value: "annually",
    },
  ];

  const captions = [
    {
      id: "0",
      title: "Tx",
      sorting: false,
    },
    {
      id: "1",
      title: t("transactionCategory.To"),
      sorting: false,
    },
    {
      id: "2",
      title: t("transactionCategory.From"),
      sorting: false,
    },
    {
      id: "3",
      title: t("transactionCategory.DateTime"),
      sorting: false,
    },
    {
      id: "4",
      title: t("transactionCategory.Amount"),
      sorting: false,
    },
    {
      id: "5",
      title: t("transactionCategory.Status"),
      sorting: false,
    },
  ];

  const depositCaptions = [
    {
      id: "0",
      title: "Account Id",
      sorting: false,
    },
    {
      id: "1",
      // title: t("transactionCategory.To"),
      title: "Receiver Name",
      sorting: false,
    },
    {
      id: "2",
      title: "Sender Name",
      // title: t("transactionCategory.From"),
      sorting: false,
    },
    {
      id: "3",
      title: t("transactionCategory.DateTime"),
      sorting: false,
    },
    {
      id: "4",
      title: t("transactionCategory.Amount"),
      sorting: false,
    },
    {
      id: "5",
      title: t("transactionCategory.Status"),
      sorting: false,
    },
  ];

  const commodityCaptions = [
    {
      id: "0",
      title: t("commodityCategory.commodityid"),
      sorting: false,
    },
    {
      id: "1",
      title: t("commodityCategory.commodityname"),
      sorting: false,
    },
    // {
    //   id: "2",
    //   title: t("commodityCategory.price"),
    //   sorting: false,
    // },
    {
      id: "2",
      title: "Contract Type ( Buyer / Seller)",
      sorting: false,
    },
    // {
    //   id: "3",
    //   title: t("commodityCategory.buyer"),
    //   sorting: false,
    // },
    // {
    //   id: "4",
    //   title: t("commodityCategory.seller"),
    //   sorting: false,
    // },
    {
      id: "5",
      title: t("transactionCategory.Status"),
      sorting: false,
    },
    {
      id: "6",
      title: t('commodityCategory.duedate'),
      sorting: false,
    },
    {
      id: "7",
      title: t('commodityCategory.cancel'),
      sorting: false,
    },
    {
      id: "8",
      title: t('commodityCategory.viewContract'),
      sorting: false,
    },
  ];

  const currencyList = [
    {
      id: "0",
      title: t("overviewCategory.flag"),
      sorting: false,
    },
    {
      id: "1",
      title: t("overviewCategory.name"),
      sorting: false,
    },
    {
      id: "2",
      title: t("overviewCategory.symbol"),
      sorting: false,
    },
    {
      id: "3",
      title: t("overviewCategory.rate"),
      sorting: false,
    },
  ];

  const transactions = [
    {
      id: "0",
      invoice: "B12341",
      name: "Figma  Pro",
      image: "/images/figma.png",
      business: "Software",
      typeTransaction: "Subscribe",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.success"),
      paidBy: "Findash",
      accountType: "Corporate Business",
      transferSend: "Oct 20, 2022 - 01:32 pm",
      transferReceive: "Oct 20, 2022 - 03:45 pm",
      accountNumber: "0124 0121 232",
      transactionId: "T-21231312",
    },
    {
      id: "1",
      invoice: "B32345",
      name: "Fiver International",
      image: "/images/fiver-inter.png",
      business: "Freelance platform",
      typeTransaction: "Receive",
      date: "November 01 , 2022",
      time: "01:32 PM",
      amount: "+$100.00",
      status: t("adminPage.pending"),
      paidBy: "Findash",
      accountType: "Corporate Business",
      transferSend: "Oct 21, 2022 - 05:55 pm",
      transferReceive: "Oct 25, 2022 - 13:45 pm",
      accountNumber: "3424 5555 232",
      transactionId: "T-34331355",
    },
    {
      id: "2",
      invoice: "B12341",
      name: "Adobe",
      image: "/images/adobe.png",
      business: "Software",
      typeTransaction: "Subscribe",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.canceled"),
      paidBy: "Findash",
      accountType: "Corporate Business",
      transferSend: "Oct 20, 2022 - 01:32 pm",
      transferReceive: "Oct 20, 2022 - 03:45 pm",
      accountNumber: "0124 0121 232",
      transactionId: "T-21231312",
    },
    {
      id: "3",
      invoice: "B32345",
      name: "Starbucks",
      image: "/images/starbucks.png",
      business: "Freelance platform",
      typeTransaction: "Receive",
      date: "November 01 , 2022",
      time: "01:32 PM",
      amount: "+$100.00",
      status: t("adminPage.pending"),
      paidBy: "Findash",
      accountType: "Corporate Business",
      transferSend: "Oct 21, 2022 - 05:55 pm",
      transferReceive: "Oct 25, 2022 - 13:45 pm",
      accountNumber: "3424 5555 232",
      transactionId: "T-34331355",
    },
    {
      id: "4",
      invoice: "B12341",
      name: "Figma  Pro",
      image: "/images/figma.png",
      business: "Software",
      typeTransaction: "Subscribe",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.success"),
      paidBy: "Findash",
      accountType: "Corporate Business",
      transferSend: "Oct 20, 2022 - 01:32 pm",
      transferReceive: "Oct 20, 2022 - 03:45 pm",
      accountNumber: "0124 0121 232",
      transactionId: "T-21231312",
    },
  ];

  const lastTransactions = [
    {
      id: "0",
      name: "Figma Pro",
      image: "/images/figma.png",
      business: "Software",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.success"),
    },
    {
      id: "1",
      name: "Fiver International",
      image: "/images/fiver-inter.png",
      business: "Freelance platform",
      date: "November 01 , 2022",
      time: "01:32 PM",
      amount: "+$100.00",
      status: t("adminPage.pending"),
    },
    {
      id: "2",
      name: "Adobe",
      image: "/images/adobe.png",
      business: "Software",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.canceled"),
    },
    {
      id: "3",
      name: "Starbucks",
      image: "/images/starbucks.png",
      business: "Freelance platform",
      date: "November 01 , 2022",
      time: "01:32 PM",
      amount: "+$100.00",
      status: t("adminPage.pending"),
    },
    {
      id: "4",
      name: "Figma  Pro",
      image: "/images/figma.png",
      business: "Software",
      date: "October 20 , 2022",
      time: "01:32 PM",
      amount: "-$32.00",
      status: t("adminPage.success"),
    },
  ];

  const admin = [
    {
      id: "0",
      title: t('adminPage.coin/token'),
      sorting: false,
    },
    {
      id: "1",
      title: t('overviewCategory.request'),
      sorting: false,
    },
    {
      id: "2",
      title: t("transactionCategory.Amount"),
      sorting: false,
    },
    {
      id: "3",
      title: t("transactionCategory.DateTime"),
      sorting: false,
    },
    {
      id: "4",
      title: t('adminPage.action'),
      sorting: false,
    },
    {
      id: "5",
      title: t("transactionCategory.Status"),
      sorting: false,
    },
  ];

  const adminAllUsers = [
    {
      id: "0",
      title: t('adminPage.name'),
      sorting: false,
    },
    {
      id: "1",
      title: t('adminPage.email'),
      sorting: false,
    },
    {
      id: "2",
      title: t("adminPage.username"),
      sorting: false,
    },
    {
      id: "3",
      title: t("adminPage.usertype"),
      sorting: false,
    },
    {
      id: "4",
      title: t("adminPage.userkyc"),
      sorting: false,
    },
    {
      id: "5",
      title: t("adminPage.freezetype"),
      sorting: false,
    },
    {
      id: "6",
      title: t('adminPage.action'),
      sorting: false,
    },
    {
      id: "7",
      title: t("adminPage.currentTier"),
      sorting: false,
    },
    {
      id: "8",
      title: t('adminPage.tierSelector'),
      sorting: false,
    },
  ];

  return {
    durationOptions,
    captions,
    admin,
    adminAllUsers,
    transactions,
    lastTransactions,
    currencyList,
    commodityCaptions,
    depositCaptions
  };
}
