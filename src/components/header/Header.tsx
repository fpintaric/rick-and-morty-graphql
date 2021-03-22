import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./Header.css";

const { Header: AntHeader } = Layout;

const NAV_OPTIONS = ["characters", "episodes", "locations"];

const Header = () => {
  const location = useLocation();
  return (
    <AntHeader>
      <Link to="/">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="rick and morty logo"
        />
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={NAV_OPTIONS.filter((entry: string) => {
          return location.pathname.includes(entry);
        })}
      >
        {NAV_OPTIONS.map((nav) => {
          return (
            <Menu.Item key={nav}>
              <Link to={`/${nav}`}>
                {nav.charAt(0).toUpperCase() + nav.slice(1)}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </AntHeader>
  );
};

export default Header;
