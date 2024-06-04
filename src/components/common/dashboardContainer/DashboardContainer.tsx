import Link from "next/link";
import {ReactNode} from "react";

export default function DashboardContainer({
  children,
  className,
  href,
}: Readonly<{
  children: ReactNode;
  className?: string;
  href?: string;
}>) {
  return href ? (
    <Link href={href} className={`bg-mainWhite rounded shadow-md ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={`bg-mainWhite rounded shadow-md ${className}`}>
      {children}
    </div>
  );
}
