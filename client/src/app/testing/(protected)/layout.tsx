import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Protected Routes",
};
function ProtectedLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const isAuthenticated = false;
  return (
    <div>
      {/* {!isAuthenticated && modal} */}
      {modal}
      {children}
    </div>
  );
}

export default ProtectedLayout;
