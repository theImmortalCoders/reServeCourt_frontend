export default function Box({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main
      className={`bg-mainWhite p-7 my-10 rounded shadow-md w-64 xs:w-80 lg:w-96 ${className}`}
    >
      {children}
    </main>
  );
}
