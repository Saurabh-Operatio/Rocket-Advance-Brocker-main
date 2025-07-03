import React from "react";
import "./Dashboard.scss";
import DealsContainer from "../../PagesComponents/DashboardComponents/DealsCard/DealsContainer";
import AllDeals from "../../PagesComponents/DashboardComponents/AllDeals/AllDeals";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_inner">
        <DealsContainer />
        <AllDeals />
      </div>
    </div>
  );
};

export default Dashboard;
