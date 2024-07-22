import React from "react";
import Easy from "./_components/Easy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Level",
};
function Page() {
  return (
    <>
      <Easy />
    </>
  );
}

export default Page;
