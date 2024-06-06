"use client";

import React from "react";
import Aside from "@/components/Aside";
import PlayerWrapper from "@/components/PlayerWrapper";
import "../app/globals.css";

const RootLayout = ({ children }) => {
  return (
    <div className="page">
      <div className="container-flex">
        <Aside />
        <div className="main">{children}</div>
      </div>
      <PlayerWrapper />
    </div>
  );
};

export default RootLayout;
