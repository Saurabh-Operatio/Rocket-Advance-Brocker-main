import React, { useEffect, useState } from "react";
import DealsCard from "./DealsCard";
import "./DealsCard.scss";
import CloseDealsIcon from "../../../Asset/Icons/CloseDeals.svg";
import TotalCommision from "../../../Asset/Icons/TotalCommision.svg";
import TotalCommisionBlue from "../../../Asset/Icons/TotalCommisionBlue.svg";
import TotalCommisionPink from "../../../Asset/Icons/TotalCommisionPink.svg";
import CalenderIcon from "../../../Asset/Icons/CalenderIcon.svg";
import ChecklistIcon from "../../../Asset/Icons/ChecklistIcon.svg";
import makeRequest from "../../../Api/makeRequest";
import { calculateNextMonthYear, getDate } from "../../../Utilis/Constent";
import { useNavigate } from "react-router-dom";

export default function DealsContainer() {
  const navigate = useNavigate();
  const [dealsData, setDealsData] = useState([]);
  const [commission, setComission] = useState([
    {
      icon: TotalCommision,
      dealsText: "Commission Advanced",
      DealsValue: "-",
      dateValue: "From last month (-) ",
      // dots: true
    },
    {
      icon: TotalCommisionBlue,
      dealsText: "Commissions Due this week",
      DealsValue: "-",
      dateValue: "-",
      // dots: true,
      smallText: "Agent name: - ",
    },
    {
      icon: TotalCommisionPink,
      dealsText: "Brokerage Income",
      DealsValue: "-",
      dateValue: "-",
      // dots: true
    },
    {
      icon: CalenderIcon,
      dealsText: "Brokerage Payout Month",
      DealsValue: "-",
      show: true,
      // dateValue: "From last month (January 1, 2023) ",
      // dots: true
    },
  ]);

  const fetchUser = async () => {
    const { data } = await makeRequest(
      ``,
      "get",
      undefined,
      "",
      undefined,
      navigate
    );
    if (!Object.keys(data || []).length) return;
    const response = [...commission];
    const { month, year, last } = calculateNextMonthYear(
      data?.Payout_Broker_Fee_Month
    );
    response[2].DealsValue = last
      ? data?.Payout_Broker_Fee?.toLocaleString()
      : 0;
    // response[2].dateValue = data?.Payout_Broker_Fee_Month?.toLocaleString();
    // response[3].DealsValue = `${month} ${year}`;
    response[3].DealsValue = month ? `${month} 1, ${year}` : "-";
    setComission(response);
  };

  const fetchDealDetail = async () => {
    const { data } = await makeRequest(
      `/deals-stats`,
      "get",
      undefined,
      "",
      undefined,
      navigate
    );
    if (!Object.keys(data || []).length) return;
    const response = [data?.existingDeals, data?.closedDeals];
    setDealsData(response);
  };

  const fetchCommission = async () => {
    const { data } = await makeRequest(
      `/commission-advanced`,
      "get",
      undefined,
      "",
      undefined,
      navigate
    );
    if (!Object.keys(data || []).length) return;
    const { weekly, monthly } = data;
    const weeklyDate = getDate(
      new Date(weekly?.timestamp.first),
      new Date(weekly?.timestamp.last)
    ).replace("(", "");
    const monthlyDate = "Last 30 days " + getDate(new Date(monthly?.timestamp));
    const response = [...commission];
    response[1].DealsValue =
      weekly?.amount?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || 0;
    response[1].dateValue = weeklyDate.replace(")", "");
    response[1].smallText = `Agent name: ${weekly?.agents || "-"} `;
    response[0].DealsValue =
      monthly?.amount?.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }) || 0;
    response[0].dateValue = monthlyDate;
    response[2].dateValue = "Last Month";
    setComission(response);
  };

  useEffect(() => {
    fetchDealDetail();
    fetchCommission();
    fetchUser();
  }, []);

  return (
    <div className="dealsContainer">
      <div className="smallCards">
        <div className="smallCards_container">
          <div className="smallCards_container_top">
            <div className="smallCards_container_left">
              <img src={ChecklistIcon} alt="Icon" />
            </div>
            <div className="smallCards_container_right">
              <h3>Existing Deals</h3>
              <h1 className="desktop-only">
                {dealsData[0]?.count || 0}
                <span>Deals</span>
              </h1>
            </div>
          </div>
          <h1 className="mobile-only" >
            {dealsData[0]?.count || 0}
            <span>Deals</span>
          </h1>
          {/* <p className="smallCards_container_footer">
            From last month {getDate(new Date(dealsData[0]?.timestamp || ""))}{" "}
          </p> */}
        </div>
        <div className="smallCards_container">
          <div className="smallCards_container_top">
            <div className="smallCards_container_left">
              <img src={CloseDealsIcon} alt="Icon" />
            </div>
            <div className="smallCards_container_right">
              <h3>Closed Deals</h3>
              <h1 className="desktop-only">
                {dealsData[1]?.count || 0}
                <span>Deals</span>
              </h1>
            </div>
          </div>
          <h1 className="mobile-only">
            {dealsData[1]?.count || 0}
            <span>Deals</span>
          </h1>
          {/* <p className="smallCards_container_footer">
            From last month {getDate(new Date(dealsData[0]?.timestamp))}{" "}
          </p> */}
        </div>
      </div>
      {commission.map((ele, index) => (
        <DealsCard
          key={index}
          cardImgLeft={ele.icon}
          dealsText={ele.dealsText}
          DealsValue={ele.DealsValue}
          dateValue={ele.dateValue}
          dots={ele.dots}
          smallText={ele.smallText}
          show={ele.show}
        />
      ))}
    </div>
  );
}
