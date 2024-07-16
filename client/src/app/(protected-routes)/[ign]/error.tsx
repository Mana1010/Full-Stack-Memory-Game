"use client";
import React from "react";
import { AxiosError } from "axios";
import ErrorUserNotFound from "./_components/ErrorUserNotFound";
import ErrorUnauthorized from "./_components/ErrorUnauthorized";
import { useRouter } from "next/navigation";
interface ErrorBoundary {
  error: {
    message: string;
    status: number;
  };
}
function ErrorBoundary({ error }: ErrorBoundary) {
  const router = useRouter();
  return (
    <div className="h-full w-full relative">
      {error.status === 404 ? (
        <ErrorUserNotFound message={error.message} />
      ) : (
        <ErrorUnauthorized message={error.message} />
      )}
      <div className="flex items-center justify-center pt-5 w-full absolute bottom-[60px]">
        <button
          onClick={() => router.push("/")}
          className="py-2.5 px-5 bg-secondary text-primary rounded-md"
        >
          GO BACK TO HOME
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
