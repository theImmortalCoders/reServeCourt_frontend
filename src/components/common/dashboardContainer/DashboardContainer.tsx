export default function DashboardContainer({
    children,
    className,
  }: Readonly<{
    children: React.ReactNode;
    className?: string;
  }>) {
    return (
      <div
        className={`bg-mainWhite rounded shadow-md ${className}`}
      >
        {children}
      </div>
    );
  }