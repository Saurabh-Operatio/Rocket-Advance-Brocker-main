export const rootName = "/";

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(inputDate) {
  var dateParts = inputDate.split("-");
  var year = dateParts[0];
  var m = dateParts[1];
  var day = dateParts[2];

  var monthName = month[parseInt(m) - 1];

  var formattedDate = monthName + " " + day + ", " + year;
  return formattedDate;
}
export const getDate = (startDate, endDate) => {
  if (endDate)
    return `(${month[startDate.getMonth()]} ${startDate.getDate()} - ${
      month[endDate.getMonth()]
    } ${endDate.getDate()}, ${startDate.getFullYear()})`;
  return `(${
    month[startDate.getMonth()]
  } ${startDate.getDate()}, ${startDate.getFullYear()})`;
};

export function calculateNextMonthYear(payoutMonthString) {
  // Extract the month and year from the Payout_Broker_Fee_Month string
  const [monthString, yearString] = payoutMonthString.split("-");

  // Define a map to convert month names to numerical values
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Get the numerical value of the current month
  const d = new Date();
  const currentMonth = d.getMonth();

  // Get the numerical value of the current year
  const currentYear = parseInt(yearString);

  // Calculate the next month and year
  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  if (nextMonth === 12) {
    nextMonth = 0; // Reset to January
    nextYear += 1; // Increment the year
  }

  // Get the name of the next month
  const nextMonthName = Object.keys(monthMap).find(
    (key) => monthMap[key] === nextMonth
  );

  // Return the next month and year
  return {
    month: nextMonthName,
    year: nextYear,
    last: d.getMonth() === monthMap[monthString],
  };
}

export const myDealsColumns = [
  {
    title: (
      <span>
        Agreement
        <br /> Number
      </span>
    ),
    dataIndex: "unique_deal_number1",
    key: "unique_deal_number1",
    fixed: "left",
  },
  {
    title: "Agent Name",
    dataIndex: "Contact_Name",
    key: "Contact_Name",
  },
  {
    title: "Property Address",
    dataIndex: "Property_Street_Address",
    key: "Property_Street_Address",
  },
  {
    title: "Closing Date",
    dataIndex: "Closing_Date",
    key: "Closing_Date",
  },
  {
    title: "Due Date",
    dataIndex: "Due_Date",
    key: "Due_Date",
  },
  {
    title: "Status",
    dataIndex: "Stage",
    key: "Stage",
  },
  {
    title: (
      <span>
        Commission
        <br /> Advanced
      </span>
    ),
    dataIndex: "Rocket_Advance_Net_Advance",
    key: "Rocket_Advance_Net_Advance",
  },
  {
    title: (
      <span>
        Commission
        <br /> Due
      </span>
    ),
    dataIndex: "Rocket_Advance_Contribution",
    key: "Rocket_Advance_Contribution",
  },
];

export const classes = {
  "Awaiting to Upload": "yellowText",
  Rejected: "redText",
  Approved: "seaGreenText",
  "Pending Approval": "greenText",
  "Under Review": "yellowText",
  "New Deal": "skyBlueText",
  "More Information Needed":"yellowText",
  // "New Deal": "seaGreenText",
  Underwriting: "orangeText",
  "Closed Won": "greenText",
  Funded: "greenText",
  "Deal Fully Closed": "purpleText",
  Denied: "redText",
  "Closed Lost": "redText",

};

export const renameValue = {
  "New Deal": "New",
  "More Information Needed": "Information Required",
  Underwriting: "Under Review",
  Approved: "Approved",
  "Closed Won": "Funded",
  Funded: "Funded",
  "Deal Fully Closed": "Completed",
  Denied: "Denied",
  "Closed Lost": "Denied",
};
export const stateClass = (value) => classes[value] || "grayText";
export const renameStatus = (val) => renameValue[val] || val;

export const isValue = (value) => {
  if (!value) return "-";
  return value;
};



export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
