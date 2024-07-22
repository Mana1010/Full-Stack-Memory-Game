import React from "react";
import Hard from "./_components/Hard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hard Level",
};
function Page() {
  return (
    <>
      <Hard />
    </>
  );
}

export default Page;
