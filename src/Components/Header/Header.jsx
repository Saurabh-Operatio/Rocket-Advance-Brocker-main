import React, { useEffect, useState } from "react";
import "./Header.scss";
import LogoMob from "../../Asset/RLogoColored.svg";
import useCurrentWidth from "../../CustomHooks/useCurrentWidth/useCurrentWidth";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../Api/makeRequest";
import { NotificationBell } from "../../StoreImages/StoreImage";
import { Tooltip } from "antd";
// import makeRequest from "../../Api/makeRequest";

// const items = [
//   {
//     key: "1",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.antgroup.com"
//       >
//         1st menu item
//       </a>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.aliyun.com"
//       >
//         2nd menu item
//       </a>
//     ),
//   },
// ];

const Header = () => {
  const width = useCurrentWidth();
  const [textData, setTextData] = useState([]);
  const navigate = useNavigate();
  const fetchActionDetails = async () => {
    const { data } = await makeRequest(
      "/broker/actions",
      "get",
      undefined,
      "",
      navigate
    );
    if (!Object.keys(data || []).length) return;
    if (data.actionReviewEmail.count)
      data.actionReviewEmail.message = `${data.actionReviewEmail.message} ${data.actionReviewEmail.propertyAddress}.`;
    const response = Object.values(data).filter((item) => +item.count);
    setTextData(response);
  };

  useEffect(() => {
    fetchActionDetails();
  }, []);
  //state management
  // const [userDetails, setUserDetails] = useState(null);

  // //useEfect for user APi cal
  // useEffect(() => {
  //   getUserData();
  // }, []);

  // //user API function
  // const getUserData = async () => {
  //   const { user } = await makeRequest("/user", "get", "");
  //   setUserDetails(user);
  // };
  return (
    <div className="header">
      <h1 className="header_heading">Broker Dashboard</h1>
      <div className="header_right">
        {/* <Dropdown
          menu={{
            items,
          }}
        >
          <div onClick={(e) => e.preventDefault()}>
            <div className="borderedBg">
              {" "}
              <AlbumIcon />
            </div>{" "}
            {userDetails?.fullname || "-"} <DownArrow />
          </div>
        </Dropdown> */}
        {/* {width < 767 && (
          <div >
            <img src={LogoMob} alt="Logo" />
          </div>
        )} */}
        <Tooltip placement="left" trigger={"click"} title={textData && textData[0]?.message}>
          <div style={{ position: "relative" }}>
            {textData && textData[0]?.count && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "#d82e4a",
                  width: "10px",
                  height: "10px",
                  borderRadius: "100%",
                }}
              ></span>
            )}

            <NotificationBell />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
