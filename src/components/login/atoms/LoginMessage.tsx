export default function LoginMessage({
  value,
  messageIfIsRed,
  messageIfIsGreen,
  messageIfIsGreenAdd,
}: {
  value: boolean | undefined;
  messageIfIsRed: string;
  messageIfIsGreen: string;
  messageIfIsGreenAdd?: string;
}) {
  return (
    <>
      {value === false && (
        <p className="mt-4 text-start text-sm text-red-800">{messageIfIsRed}</p>
      )}
      {value === true && (
        <div className="mt-4 text-start text-sm">
          <p className="text-green-800">{messageIfIsGreen}</p>
          {messageIfIsGreenAdd}
        </div>
      )}
    </>
  );
}
