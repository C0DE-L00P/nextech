import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>NEXTECH Electronics</title>
      </Head>
      <Navbar />
      <div className="main-container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
