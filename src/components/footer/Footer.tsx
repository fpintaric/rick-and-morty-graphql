import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Made by{" "}
      <a href="https://www.github.com/fpintaric">github.com/fpintaric</a> ©2021
    </AntFooter>
  );
};

export default Footer;
