import React, { ReactNode } from "react";

function TestingLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

export default TestingLayout;
