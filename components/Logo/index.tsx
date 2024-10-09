import Link from "next/link";
import cn from "classnames";
import styles from "./Logo.module.sass";
import Image from "@/components/Image";

type LogoProps = {
    className?: string;
    small?: boolean;
};

const Logo = ({ className, small }: LogoProps) => (
    <Link
        className={cn(styles.logo, className, { [styles.small]: small })}
        style={{ display: "flex", gap: "8px", alignItems: "center" }}
        href="/dashboard"
    >
        <Image src="/logotrans.png" width={170} height={170} alt="Logo" style={{ width: "80%", height: "80%" }} />
    </Link>
);

export default Logo;
