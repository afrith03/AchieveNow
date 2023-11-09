"use client";
import React from "react";
const axios = require("axios");
// 'use client'
function ServiceNowStatus() {
  // Dummy headers and cookies
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YourAccessToken", // Replace with your actual access token
    "Custom-Header": "YourCustomHeaderValue",
  };

  const cookies = {
    cookie1: "value1",
    cookie2: "value2",
  };

  // Request body
  const requestBody = {
    condition:
      "'sysStatus' == 1 and 'Assigned_Support_Company_ID' == $companyid$ and 'Assigned_Support_Organization' == $organization$ and 'Assigned_Group_ID' == $groupid$ and 'sysCreateTime' >= \"1696098600000\" and 'sysCreateTime' <= \"1732818600000\"",
    order: {
      sysCreateTime: false,
    },
    page: {
      currentPage: 1,
      max: 20,
      min: 0,
      pageSize: 20000,
      totalCount: 0,
      totalPage: 1,
    },
    query: {
      pc1: "",
      pc2: "",
      pc3: "",
      oc1: "",
      oc2: "",
      oc3: "",
      ticketid: "",
      customerid: "",
      companyid: "CPY000000003423",
      organization: "ISS-SIE",
      groupid: "SGP000000005012",
      loginid: "",
      resolution: "",
      priorty: "",
      servicetype: "",
      status: "",
      statusreason: "",
      summary: "",
      notes: "",
      submitter: "",
    },
  };
  const endPoint = "https://newitsm.lenovo.com/sys/data/169/list";
  const fetchAndUpdateTicket = () => {
    console.log("hello");
    // Axios POST request
    axios
      .post(endPoint, requestBody, { headers, cookies })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <input className="text" type="text" name="Cookie details" id="cookie" />
      <button
        onClick={fetchAndUpdateTicket}
        className="btn btn-primary"
        type="button"
      >
        Update
      </button>
    </div>
  );
}

export default ServiceNowStatus;
