import React from "react";
import Style from "../_components/Style";
import Link from "next/link";
function Folder1() {
  return (
    <div>
      <Style>Folder1</Style>
      <Link
        href={"/dashboard/bini"}
        className="text-blue-500 underline underline-offset-2 decoration-blue-500"
      >
        Pantropiko
      </Link>
    </div>
  );
}

export default Folder1;
