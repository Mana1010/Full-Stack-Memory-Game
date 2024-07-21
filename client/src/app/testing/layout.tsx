import React, { ReactNode } from "react";

function TestingLayout({
  children,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return <div>{children}</div>;
}

export default TestingLayout;
