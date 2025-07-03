import React from "react";
import InputCustom from "../../Components/InputCustom/InputCustom";
import { Col, Row, Select } from "antd";
import React from "react";
import { Row, Col, Select } from "antd";

export default function NewDealsInputs() {
  return (
    <div className="newDealsformInputs">
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <InputCustom label={"Broker of Record Name"} placeholder={"Harlen"} />
        </Col>
        <Col xs={24} xl={12}>
          <InputCustom label={"Broker Admin Name"} placeholder={"Vlad"} />
        </Col>
      </Row>
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <InputCustom placeholder={"Postal Code"} />
        </Col>
        <Col xs={24} xl={12}>
          <InputCustom placeholder={"Country"} />
        </Col>
      </Row>
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <InputCustom
            label={"Total Commission (without HST) *"}
            placeholder={"$"}
          />
        </Col>
        <Col xs={24} xl={12}>
          <InputCustom
            label={"Total Requested Commission Advance *"}
            placeholder={"$"}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24}>
          <InputCustom
            label={"Total Requested Commission Advance %"}
            placeholder={"$"}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24}>
          <InputCustom
            label={"Anticipated Closing Date: *"}
            placeholder={"dd-MMM-yyyy"}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
        <Col xs={24}>
          <label className="labeltext">Are you the co-operative or listing agent ? *</label>
          <Select
            className="selectBorderedCustom "
            placeholder="-Select-"
            options={[
              {
                value: "coperativeAgent",
                label: "Co-perative Agent",
              },
              {
                value: " listingAgent",
                label: " Listing Agent",
              }
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}


