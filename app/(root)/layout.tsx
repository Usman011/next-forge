import React from "react";

import Navbar from "@/components/navigation/navbar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default BaseLayout;
