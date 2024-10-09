import styles from "../templates/Login/LoginV1Page/LoginPage.module.sass";
import LayoutLogin from "@/components/LayoutLogin";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
type LoginPageProps = {};

const LoginPage = ({ }: LoginPageProps) => {
    const { t } = useTranslation();
    return (
        <LayoutLogin
            classLeft={styles.left}
            left={
                <>
                    <div className={styles.images}>
                        <Image
                            src="/images/bg.png"
                            width={1004}
                            height={743}
                            style={{ width: "100%", height: "auto" }}
                            alt="Dashboard"
                        />
                    </div>
                    <div className={styles.wrap}>
                        <div className={styles.title}>{t("loginPage.welcomeTitle")}</div>
                        <div className={styles.title}>
                            {t('loginPage.webTitle')}
                        </div>
                        <div className={styles.text}>
                            {t('loginPage.webSubtitle')}
                        </div>
                    </div>
                </>
            }
            right={
                <div style={{
                    // position: "absolute", zIndex: 10, width: '68%', top: '10',
                    padding: '32px',
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden'
                }}>
                    <div>
                        <Link href="/login">
                            <IoArrowBackOutline size={20} style={{ cursor: "pointer" }} className="hoverIcon" />
                        </Link>
                    </div>
                    {/* Header */}
                    <div style={{
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '32px',
                            letterSpacing: '-0.03em',
                            fontWeight: 700
                        }}>{t('termsOfUsePage.termsofuse.title')}</div>
                    </div>
                    {/* Terms Of Use */}
                    <div style={{
                        overflowY: "scroll",
                        maxHeight: "23rem",
                    }} className="hidden-scroll">
                        <h4>{t('termsOfUsePage.termsofuse.paragraph').split('.')[0]}</h4>
                        {t('termsOfUsePage.termsofuse.paragraph').split('.')[1]}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.chaincashcateg.title')}</h4>
                        {t('termsOfUsePage.chaincashcateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.prohibitedcateg.title')}</h4>
                        {t('termsOfUsePage.prohibitedcateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.bestpracticecateg.title')}</h4>
                        {t('termsOfUsePage.bestpracticecateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.gdprandlgpd.title')}</h4>
                        {t('termsOfUsePage.gdprandlgpd.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.nexttechcateg.title')}</h4>
                        {t('termsOfUsePage.nexttechcateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.monitoringcateg.title')}</h4>
                        {t('termsOfUsePage.monitoringcateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.amendmentscateg.title')}</h4>
                        {t('termsOfUsePage.amendmentscateg.paragraph')}

                        <h4 style={{ marginTop: "20px" }}>{t('termsOfUsePage.governinglaw.title')}</h4>
                        {t('termsOfUsePage.governinglaw.paragraph')}
                    </div>

                </div >
            }
        />
    );
}

export default LoginPage;
