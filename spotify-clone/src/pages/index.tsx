// pages/index.js
import React from "react";
import RootLayout from "@/app/layout";
import Home from "@/components/Home";

const HomePage = () => {
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  );
};

export default HomePage;
