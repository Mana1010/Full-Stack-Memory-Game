"use client";
import React from "react";

function ErrorF1({ error }: { error: Error }) {
  return <div className="text-red-500">{error.message}</div>;
}

export default ErrorF1;
