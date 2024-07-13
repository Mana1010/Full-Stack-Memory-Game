import React from "react";
import AccountDetails from "./_components/AccountDetails";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Account Details",
};
async function Page({
  params,
}: {
  params: {
    ign: string;
  };
}) {
  return (
    <>
      <AccountDetails username={params.ign} />
    </>
  );
}

export default Page;
