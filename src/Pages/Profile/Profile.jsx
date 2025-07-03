import React, { useEffect, useState } from "react";
import "./Profile.scss";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import InputCustom from "../../Components/InputCustom/InputCustom";
import { Button, Col, Row, Upload } from "antd";
import { UploadIcon } from "../../StoreImages/StoreImage";
import makeRequest from "../../Api/makeRequest";
import { useNavigate } from "react-router-dom";
import useCurrentWidth from "../../CustomHooks/useCurrentWidth/useCurrentWidth";

export default function Profile() {
  const [useDetail, setUserDetail] = useState({});
  const width = useCurrentWidth();

  const navigate = useNavigate();
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
    setUserDetail(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="newDeals whiteCard">
      <div className="note">
        If any of your information needs to be changed, please call us at
        1-800-518-3577
      </div>
      <div className="newDeals_wrapper">
        {/* <p className="newDeals_wrapper_text">Property Information</p> */}

        <div className="newDeals_wrapper_inputsCont">
          {/* <NewDealsInputs /> */}

          <div className="newDealsformInputs">
            <h1 className="headingText">Brokerage Information</h1>

            <Row style={{ marginTop: 14 }} gutter={[60, 16]}>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Broker of Record Name"}
                  placeholder={"Harlen"}
                  value={useDetail?.Broker_of_Record_Full_Name}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Broker Admin Name"}
                  placeholder={"Vlad"}
                  value={useDetail?.Broker_Administrator_Full_Name}
                />
              </Col>
            </Row>
          </div>
          <div className="newDealsformInputs" style={{ marginTop: 20 }}>
            <h1 className="headingText">Address</h1>
            <Row style={{ marginTop: 14 }} gutter={[60, 16]}>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Street"}
                  placeholder={"Center Street"}
                  value={useDetail?.Street}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"City"}
                  placeholder={"Toronto"}
                  value={useDetail?.City}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"State"}
                  placeholder={"Ontario"}
                  value={useDetail?.State}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Zip Code"}
                  placeholder={"M123M1"}
                  value={useDetail?.Zip_Code}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Country"}
                  placeholder={"Canada"}
                  value={useDetail?.Country}
                />
              </Col>
            </Row>
          </div>
          <div className="newDealsformInputs" style={{ marginTop: 20 }}>
            <h1 className="headingText">Direct Deposit Info</h1>
            <Row style={{ marginTop: 14 }} gutter={[60, 16]}>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Bank Name"}
                  placeholder={"RBC"}
                  value={useDetail?.Bank_Name}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Bank Account Number"}
                  placeholder={"12345678"}
                  value={useDetail?.Bank_Account_Number}
                />
              </Col>
              <Col xs={24} xl={12}  lg={12} >
                <InputCustom
                  label={"Branch Number"}
                  placeholder={"123"}
                  value={useDetail?.Branch_Number}
                />
              </Col>
            </Row>
          </div>
        </div>
        {/* <NewDealsUploads /> */}
        <div className="newDealsformUpload">
          <Row
            gutter={[60]}
            style={width < 767 ? { flexDirection: "column-reverse" } : {}}
          >
            <Col xs={24} xl={12}  lg={12}  style={{ marginTop: 34 }}>
              <ButtonCustom
                customClass={"btnsubmit"}
                label={"Submit Direct Deposit Info"}
                onClick={() =>
                  useDetail?.direct_deposit_information_form
                    ? window.open(
                        useDetail?.direct_deposit_information_form,
                        "_blank",
                        "width=750, height=600"
                      )
                    : null
                }
              />
            </Col>
            <Col xs={24} xl={12}  lg={12}  style={{ marginTop: 34 }}>
              <div className="uploadCutom">
                {/* <label>Copy of the Purchase and Sale Agreement *</label> */}
                <Upload>
                  <Button
                    onClick={() =>
                      useDetail?.void_cheque_form
                        ? window.open(
                            useDetail?.void_cheque_form,
                            "_blank",
                            "width=750, height=600"
                          )
                        : null
                    }
                  >
                    Upload Void Cheque File <UploadIcon />
                  </Button>
                </Upload>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
