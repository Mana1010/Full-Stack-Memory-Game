import React from "react";
import Link from "next/link";
function Testing() {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <Link href={"/testing/login"} className="text-white">
        Click me ugh
      </Link>
    </div>
  );
}

export default Testing;
