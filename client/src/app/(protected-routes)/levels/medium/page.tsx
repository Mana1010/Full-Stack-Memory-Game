import React from "react";
import Medium from "./_components/Medium";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medium Level",
};
function Page() {
  return (
    <>
      <Medium />
    </>
  );
}

export default Page;
