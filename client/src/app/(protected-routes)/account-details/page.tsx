import React from "react";
import AccountDetails from "./_components/AccountDetails";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head";
// async function fetchUser() {
//   const response = await fetch(`${baseUrl}/user/account-details`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     credentials: "include",
//   });
//   const data = await response.json();
//   console.log(data);
// }
// export async function generateMetadata() {
//   const userData = await fetchUser();
//   console.log(userData);
//   return {
//     title: "Hello",
//   };
// }
async function Page() {
  return (
    <>
      <AccountDetails />
    </>
  );
}

export default Page;
