import React, { ReactNode } from "react";

function Style({ children }: { children: ReactNode }) {
  return (
    <div className="flex text-white w-full justify-center items-center flex-col space-y-2 h-full">
      {children}
    </div>
  );
}

export default Style;
