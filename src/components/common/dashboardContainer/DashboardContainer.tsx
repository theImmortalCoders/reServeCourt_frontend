export default function DashboardContainer({
    children,
    className,
    onClick
  }: Readonly<{
    children: React.ReactNode;
    className?: string;
    onClick?:  React.MouseEventHandler<HTMLDivElement>;
  }>) {
    return (
      <div onClick={onClick}
        className={`bg-mainWhite rounded shadow-md ${className}`}
      >
        {children}
      </div>
    );
  }