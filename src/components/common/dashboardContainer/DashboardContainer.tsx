import Link from "next/link";

export default function DashboardContainer({
  children,
  className,
  href,
}: Readonly<{
  children: React.ReactNode;
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
