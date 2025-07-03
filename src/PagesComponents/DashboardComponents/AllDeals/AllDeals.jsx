import React, { useEffect, useState } from "react";
import "./AllDeals.scss";
import { Pagination, Table } from "antd";
import makeRequest from "../../../Api/makeRequest";
import {
  formatDate,
  getDate,
  isValue,
  myDealsColumns,
  numberWithCommas,
  renameStatus,
  stateClass,
} from "../../../Utilis/Constent";
import { useNavigate } from "react-router-dom";

export default function AllDeals() {
  const [dataSource, setDataSource] = useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchDealDetail = async (value) => {
    const { data, total } = await makeRequest(
      `/deals?filter=${value || "all"}&page=${page}`,
      "get",
      undefined,
      "",
      undefined,
      navigate
    );

    if (!Object.keys(data || []).length) return;

    setTotal(total);
    const modifyResponse = data.map((item) => ({
      ...item,
      Closing_Date: formatDate(item?.Closing_Date),
      Due_Date: formatDate(item?.Due_Date),
      propertyAddr: (
        <span style={{ maxWidth: 152, display: "block" }}>
          {isValue(item?.Property_Street_Address)}
        </span>
      ),
      Contact_Name: item?.Contact_Name?.name || "-",
      Rocket_Advance_Contribution: `$${isValue(
        numberWithCommas(item.Rocket_Advance_Contribution.toFixed(2))
      )}`,
      Rocket_Advance_Net_Advance: `$${isValue(
        numberWithCommas(item.Rocket_Advance_Net_Advance.toFixed(2))
      )}`,
      Stage: (
        <span
          className={`${stateClass(
            item?.Stage
          )} greyText textDecoration spaceNowrap`}
        >
          {isValue(item?.Stage) && renameStatus(item?.Stage)}
        </span>
      ),
    }));
    setDataSource(modifyResponse);
  };

  useEffect(() => {
    fetchDealDetail();
  }, [page]);
  return (
    <div className="allDeals">
      <div className="allDeals_wrapper">
        {/* Desktop Table View */}
        <div className="allDeals_wrapper_table desktop-only">
          <Table
            className="commonTable"
            dataSource={dataSource}
            columns={myDealsColumns}
            pagination={false}
          />
          <Pagination
            total={total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            current={page}
            onChange={setPage}
            simple
            showSizeChanger={false}
            defaultPageSize={10}
            defaultCurrent={1}
          />
        </div>

        {/* Mobile Accordion View */}
        <div className="mobile-deals mobile-only">
          {dataSource?.slice(0, visibleCount).map((item, index) => (
            <div key={index} className="deal-card">
              <div
                className="deal-header"
                style={{
                  backgroundColor: item.open ? "#CA2543" : "#fff",
                  color: item.open ? "#fff" : "#000",
                }}
                onClick={() =>
                  setDataSource((prev) =>
                    prev.map((deal, i) =>
                      i === index ? { ...deal, open: !deal.open } : { ...deal, open: false }
                    )
                  )
                }
              
              >
                {!item.open ? (
                  <div className="deal-collapsed">
                    <div className="number">{item.unique_deal_number1}</div>
                    <div className="flex">
                      <div className={`status-badge ${String(item.Stage).toLowerCase().replace(/\s/g, "")}`}>
                        {renameStatus(item.Stage)}
                      </div>
                      <div className="arrow ms-2">▼</div>
                    </div>
                  </div>
                ) : (
                  <div className='deal-collapsed' >
                    <div className="label">Agreement Number</div>
                    <div className="flex">
                      <div className="number">{item.unique_deal_number1}</div>
                      <div className="arrow ms-2">▲</div>
                    </div>
                  </div>
                )}
              </div>

              {item.open && (
                <div className="deal-body">
                  <div className="field">
                    <div className="field-label">Property Address</div>
                    <div className="field-value">{item?.Property_Street_Address}</div>
                  </div>
                  <hr />

                  <div className="field">
                    <div className="field-label">Status</div>
                    <div className={`status-badge ${String(item.Stage).toLowerCase().replace(/\s/g, "")}`}>
                      {renameStatus(item.Stage)}
                    </div>
                  </div>
                  <hr />

                  <div className="field">
                    <div className="field-label">Agent Name</div>
                    <div className="field-value">{item?.Contact_Name}</div>
                  </div>
                  <hr />

                  <div className="flex-pair">
                    <div className="field">
                      <div className="field-label">Closing Date</div>
                      <div className="field-value">{item.Closing_Date}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Due Date</div>
                      <div className="field-value">{item.Due_Date}</div>
                    </div>
                  </div>
                  <hr />

                  <div className="flex-pair">
                    <div className="field">
                      <div className="field-label">Commission Advanced</div>
                      <div className="field-value">{item.Rocket_Advance_Contribution}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Commission Due</div>
                      <div className="field-value">{item.Rocket_Advance_Net_Advance}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Load More Button */}
          {visibleCount < dataSource?.length && (
            <div className="load-more-container">
              <p
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                Load More...
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );

}
