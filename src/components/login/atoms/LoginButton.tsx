export function LoginButton({
  loading,
  disabled,
  messageIfLoadingIsTrue,
  messageIfLoadingIsFalse,
}: {
  loading: boolean;
  disabled: boolean;
  messageIfLoadingIsTrue: string;
  messageIfLoadingIsFalse: string;
}) {
  return (
    <button
      className="bg-darkGreen text-mainWhite rounded px-3 lg:px-4 py-2 w-full"
      disabled={disabled}
    >
      {loading ? (
        <p>{messageIfLoadingIsTrue}</p>
      ) : (
        <p>{messageIfLoadingIsFalse}</p>
      )}
    </button>
  );
}
