"use client";
import { useFormStatus } from "react-dom";

export function LoginButton({
  messageIfLoadingIsTrue,
  messageIfLoadingIsFalse,
}: {
  messageIfLoadingIsTrue: string;
  messageIfLoadingIsFalse: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-darkGreen text-mainWhite rounded px-3 lg:px-4 py-2 w-full"
      disabled={pending}
    >
      {pending ? (
        <p>{messageIfLoadingIsTrue}</p>
      ) : (
        <p>{messageIfLoadingIsFalse}</p>
      )}
    </button>
  );
}
