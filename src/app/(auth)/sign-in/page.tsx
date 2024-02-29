"use client";
import React, { FC, useState } from "react";

export interface PageProps {}

const Page: FC<PageProps> = () => {
  return (
    <main
      className={
        "bg-indigo-200 h-screen w-full flex items-center justify-center overflow-y-hidden overflow-x-hidden"
      }
    >
      LOGIN PAGE
    </main>
  );
};

export default Page;
