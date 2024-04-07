export default function Page({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main className={`min-h-max max-w-max bg-mainWhite ${className}`}>
      {children}
    </main>
  );
}
