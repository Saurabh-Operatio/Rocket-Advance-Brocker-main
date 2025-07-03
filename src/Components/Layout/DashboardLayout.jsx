import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import useCurrentWidth from "../../CustomHooks/useCurrentWidth/useCurrentWidth.jsx";
import Logo from "../../Asset/LogoMainColored.svg";

import {
  ContactIcon,
  DashboardIcon,
  DashboardIconFill,
  EmailIcon,
  EmailIconFilled,
  InternetIcon,
  LogoutIcon,
  LogoutIconMobileScreen,
  ProfileIcon,
  UserIcon,
  UserIconFilled,
  UserIconUnfilled,
  rightArrow
} from "../../StoreImages/StoreImage.jsx";
import { BellOutlined, MoreOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import ContactUs from "../ContactUs/ContactUs.jsx";
import { isLogged } from "../../Api/makeRequest.js";

const DashboardLayout = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const width = useCurrentWidth();
  const location = useLocation();
  const pathname = location.pathname;
  const { Sider, Content } = Layout;
  const isMobile = width < 767;

  const isActive = (path) => pathname === path;

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardIcon />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "profile",
      icon: <UserIcon />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "logout",
      icon: <LogoutIcon />,
      label: (
        <div onClick={() => isLogged(navigate)} style={{ cursor: "pointer" }}>
          Logout
        </div>
      ),
    },
    {
      key: "contact",
      label: <ContactUs />,
    },
  ];

  if (isMobile) {
    return (
      <div className="mobile-layout-wrapper">
        {showContact ? (
          // Fullscreen ContactUs view
          <>
            <div className="mobile-top-header">
              <div className="broker-box">
                <ArrowLeftOutlined onClick={() => setShowContact(false)} />
              </div>
              <div className="top-icons">
                <BellOutlined className="top-icon" />
                <div className="more-wrapper">
                  <MoreOutlined
                    className="top-icon-dot rotated"
                    onClick={() => setShowPopup((prev) => !prev)}
                  />
                  {showPopup && (
                    <>
                      <div className="overlay" onClick={() => setShowPopup(false)}></div>
                      <div className="popup">
                        <div
                          onClick={() => {
                            setShowContact(true);
                            setShowPopup(false);
                          }}
                          className="popup-box"
                        >
                          <ContactIcon className="popup-icon" />
                          <span>Contact Us</span>
                        </div>
                        <div className="popup-box" onClick={() => isLogged(navigate)}>
                          <LogoutIconMobileScreen className="popup-icon" />
                          <span>Logout</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mobile-main-content">
              <div className="ContactUSResponsive">
                <p style={{ fontWeight: 900 }}>Contact Us</p>
                <p style={{ marginTop: 12 }}>Schedule your Brokerage Lunch & Learns.</p>

                <div className="contact-details">
                  <div className="contact-row">
                    <div className="icon-col">
                      <EmailIconFilled />
                    </div>
                    <div className="text-col">
                      <p className="linkText">info@rocketadvance.ca</p>
                    </div>
                  </div>

                  <div className="contact-row">
                    <div className="icon-col">
                      <ContactIcon />
                    </div>
                    <div className="text-col">
                      <p>1-800-518-3577</p>
                    </div>
                  </div>

                  <div className="contact-row">
                    <div className="icon-col">
                      <InternetIcon />
                    </div>
                    <div className="text-col">
                      <a href="https://rocketadvance.ca" target="_blank" rel="noopener noreferrer">
                        rocketadvance.ca
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mobile-bottom-nav height-mobile-bottom">
                <div
                  className=""
                  onClick={() => {
                    navigate("/dashboard");
                    setShowContact(false);
                  }}
                >
                  {pathname === "/dashboard" ? <DashboardIconFill /> : <DashboardIcon />}
                </div>

                <div
                  className=""
                  onClick={() => {
                    navigate("/profile");
                    setShowContact(false);
                  }}
                >
                  {pathname === "/profile" ? <ProfileIcon /> : <UserIconUnfilled />}
                </div>
              </div>
            </div>

          </>
        ) : (
          <>
            {/* Default Mobile Layout */}
            <div className="mobile-top-header">
              <div className="broker-box">
                {pathname === "/profile" ? <ProfileIcon /> : <DashboardIconFill />}
                <span className="broker-text">
                  {pathname === "/profile" ? "Profile" : "Broker of record"}
                </span>
              </div>
              <div className="top-icons">
                <BellOutlined className="top-icon" />
                <div className="more-wrapper">
                  <MoreOutlined
                    className="top-icon-dot rotated"
                    onClick={() => setShowPopup((prev) => !prev)}
                  />
                  {showPopup && (
                    <>
                      <div className="overlay" onClick={() => setShowPopup(false)}></div>
                      <div className="popup">
                        <div
                          onClick={() => {
                            setShowContact(true);
                            setShowPopup(false);
                          }}
                          className="popup-box"
                        >
                          <ContactIcon className="popup-icon" />
                          <span>Contact Us</span>
                        </div>
                        <div className="popup-box" onClick={() => isLogged(navigate)}>
                          <LogoutIconMobileScreen className="popup-icon" />
                          <span>Logout</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mobile-main-content" style={{ paddingBottom: "100px" }}>{children}</div>
              <div className="mobile-bottom-nav"
                
              >
              <div
                className=""
                onClick={() => navigate("/dashboard")}
              >
                {pathname === "/dashboard" ? <DashboardIconFill /> : <DashboardIcon />}
              </div>

              <div
                className=""
                onClick={() => navigate("/profile")}
              >
                {pathname === "/profile" ? <ProfileIcon /> : <UserIconUnfilled />}
              </div>
            </div>

          </>
        )
        }
      </div >
    );
  }

  return (
    <div className="mainLayout " >
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
        >
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <Menu
            className={collapsed ? "collapsed" : ""}
            theme="dark"
            mode="inline"
            selectedKeys={[
              pathname === "/dashboard"
                ? "dashboard"
                : pathname === "/profile"
                  ? "profile"
                  : "",
            ]}
            items={menuItems}
          />
        </Sider>

        <Layout className="site-layout">
          <Header />
          <Content className="content">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
