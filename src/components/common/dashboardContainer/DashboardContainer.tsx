import Link from "next/link";

export default function DashboardContainer({
    children,
    className,
    clubId,
  }: Readonly<{
    children: React.ReactNode;
    className?: string;
    clubId?: number;
  }>) {
    return (
      clubId ? (
        <Link href={`/managecourts/${clubId}`}
          className={`bg-mainWhite rounded shadow-md ${className}`}
        >
          {children}
      </Link>
      ) : (
        <div
          className={`bg-mainWhite rounded shadow-md ${className}`}
        >
          {children}
        </div>
      )
      
    );
  }