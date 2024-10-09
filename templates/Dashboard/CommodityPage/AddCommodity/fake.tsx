// {/* <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Adjust minmax values as needed
//           gridTemplateRows: "repeat(4, 1fr)",
//           gap: "10px",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           // height: "100%",
//         }}
//       >
//         <Select
//           // style={{ marginBottom: "-32px !important" }}
//           // className={styles.field}
//           classToggle={styles.toggleSelect}
//           label={t("commodityCategory.choosecomm")}
//           value={card}
//           onChange={handleChange}
//           options={cards}
//         />
//         <Field
//           label={t("commodityCategory.price")}
//           placeholder={t("commodityCategory.price")}
//           type="number"
//           value={price}
//           onChange={(e: any) => setPrice(e.target.value)}
//           required
//           min={0}
//         />
//         {/* more fields */}
//         <Field
//           // label={t("commodityCategory.signatorySeller")}
//           label={"Signatory Seller"}
//           placeholder={"Signatory Seller"}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={
//             commoDetails.signatorySeller || "MR.CEO/WENDERSON AUGUSTO DE SOUZA"
//           }
//           // onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, [e.target.value]: e.target.value }))}
//           onChange={(e: any) =>
//             setCommoDetails((prev: any) => ({
//               ...prev,
//               signatorySeller: e.target.value,
//             }))
//           }
//           required
//         />
//         <Field
//           // label={t("commodityCategory.address")}
//           label={"Address"}
//           placeholder={"Address"}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.address || "AVENIDA GOVERNADOR VALADARES, No 239"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, address: e.target.value }))
//           }
//           required
//         />
//         <Field
//           // label={t("commodityCategory.city/state")}
//           label={"City / State"}
//           placeholder={"City / State"}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.citystate || "UNAÍ - MINAS GERAIS"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({
//               ...pre,
//               citystate: e.target.value,
//             }))
//           }
//           required
//         />
//         <Field
//           label={"Phone"}
//           // label={t("commodityCategory.phone")}
//           placeholder={"Phone"}
//           // placeholder={t("commodityCategory.string")}
//           type="number"
//           value={commoDetails.phone || "+55 (38) 3676-6642"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, phone: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Mobile"}
//           // label={t("commodityCategory.mobile")}
//           placeholder={"Mobile"}
//           // placeholder={t("commodityCategory.string")}
//           type="number"
//           value={commoDetails.mobile || "+55 (38) 9.9961-4385"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, mobile: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Company"}
//           // label={t("commodityCategory.company")}
//           placeholder={t("Company")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={
//             commoDetails.company || "ALIANÇA COMÉRCIO CORPORATION TRADING LTDA"
//           }
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, company: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Registration"}
//           // label={t("commodityCategory.registration")}
//           // placeholder={t("commodityCategory.string")}
//           placeholder={t("Registration")}
//           type="string"
//           value={commoDetails.registration || "03.213.862/0001-90"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({
//               ...pre,
//               registration: e.target.value,
//             }))
//           }
//           required
//         />
//         <Field
//           label={"Email1"}
//           // label={t("commodityCategory.email1")}
//           placeholder={t("Email1")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={
//             commoDetails.email1 || "comercial@aliancacorporationtrading.com"
//           }
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, email1: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Email2"}
//           // label={t("commodityCategory.email2")}
//           placeholder={t("Email2")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.email2 || "adm@aliancacorporationtrading.com"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, email2: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Email3"}
//           // label={t("commodityCategory.email3")}
//           placeholder={t("Email3")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={
//             commoDetails.email3 || "financeiro@alianca corporationtrading.com"
//           }
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, email3: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Site"}
//           // label={t("commodityCategory.site")}
//           placeholder={t("Site")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.site || "www.aliancacorporationtrading.com"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, site: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Cgc / Mpa"}
//           // label={t("commodityCategory.cgc/mpa")}
//           placeholder={t("Cgc / Mpa")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.cgcMpa || "MG 003325-1"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({ ...pre, cgcMpa: e.target.value }))
//           }
//           required
//         />
//         <Field
//           label={"Aqsic / Gacc"}
//           // label={t("commodityCategory.aqsic/gacc")}
//           placeholder={t("Aqsic / Gacc")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={commoDetails.aqsicGacc || "07621000057"}
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({
//               ...pre,
//               aqsicGacc: e.target.value,
//             }))
//           }
//           required
//         />
//         <Field
//           label={"Site-Aqsic / Gacc"}
//           // label={t("commodityCategory.site-aqsic/gacc")}
//           placeholder={t("Site-Aqsic / Gacc")}
//           // placeholder={t("commodityCategory.string")}
//           type="string"
//           value={
//             commoDetails.siteAqsicGacc ||
//             "https://www.gacc.app/gacc-aqsiq-food-register-search.html"
//           }
//           onChange={(e: any) =>
//             setCommoDetails((pre: any) => ({
//               ...pre,
//               siteAqsicGacc: e.target.value,
//             }))
//           }
//           required
//         />
//         {/* more fields */}

//         <Field
//           label={t("commodityCategory.buyeraddress")}
//           placeholder={t("commodityCategory.address")}
//           type="string"
//           value={address}
//           onChange={(e: any) => setAddress(e.target.value)}
//           required
//         />
//         <Field
//           label={t("commodityCategory.duedays")}
//           placeholder={t("commodityCategory.duedays")}
//           type="number"
//           value={dueDays}
//           onChange={(e: any) => setDueDays(e.target.value)}
//           required
//           min={1}
//         />
//       </div> */}