import React from "react";
import Link from "next/link";
function Dashboard() {
  return (
    <div className="text-white flex w-full h-screen justify-center">
      Dashboard
      <Link href={"/testing/login"} className="text-blue-500">
        Dashboard Link
      </Link>
    </div>
  );
}

export default Dashboard;
