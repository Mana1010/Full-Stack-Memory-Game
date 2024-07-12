"use client";
import React, { useEffect } from "react";
import Head from "next/head";
function PageTitle({ pathname }: { pathname: string }) {
  useEffect(() => {
    document.title = `Memory Game | ${pathname}`;
  }, [pathname]);
  return null;
}

export default PageTitle;
