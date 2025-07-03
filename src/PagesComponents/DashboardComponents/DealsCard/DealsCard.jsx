import React from "react";
import "./DealsCard.scss";

export default function DealsCard(
  {
    cardImgLeft,
    dealsText,
    DealsValue,
    dateValue,
    advanceText,
    fontLg,
    smallText,
    show,
  },
  props
) {
  return (
    <div className="dealsCard whiteCard" {...props}>
      <div className="dealsCard_imgSec">
        <span className="dealsCard_imgSec_left">
          {cardImgLeft && <img src={cardImgLeft} alt="Icon" />}
        </span>
        <span className="dealsCard_imgSec_right">
          {/* {dots && (
            <span className="dealsCard_imgSec_dots">
              <ThreeDots />
            </span>
          )} */}
          <h3>{dealsText}</h3>
          {advanceText && <h3 style={{ marginBottom: 12 }}>{advanceText}</h3>}
        </span>
      </div>
      <p className="smallText">{smallText !== "" ? smallText : " "}</p>
      <h2
        className={`deal-value ${fontLg ? "fontLg" : ""}`}
        style={
          typeof DealsValue === "string" && !isNaN(Date.parse(DealsValue)) && window.innerWidth < 768
            ? { color: "black" }
            : undefined
        }
      >
        {!show ? "$" : null}
        {DealsValue}
      </h2>

      <div className="dealsCard_date">{dateValue} </div>
    </div>
  );
}
