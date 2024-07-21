import React, { ReactNode } from "react";

interface DashboardLayout {
  children: ReactNode;
  folderOne: ReactNode;
  folderTwo: ReactNode;
  folderThree: ReactNode;
}
function DashboardLayout({
  children,
  folderOne,
  folderTwo,
  folderThree,
}: DashboardLayout) {
  return (
    <div className="w-full flex h-screen px-5 justify-center items-center space-x-5 flex-col">
      <div className="flex w-full justify-center text-white">{children}</div>
      <div className="border-2 border-white p-5 w-48 h-48">{folderOne}</div>
      <div className="border-2 border-white p-5 w-48 h-48">{folderTwo}</div>
      <div className="border-2 border-white p-5 w-48 h-48">{folderThree}</div>
    </div>
  );
}

export default DashboardLayout;
