import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

function GeneralReportPage({ bar, lounge, barTotal, loungeTotal }) {
  const {
    adminCashPayments,
    adminPosPayments,
    adminTransferPayments,
    adminTotalRevenue,
    user,
    adminTables,
    displayAdminTables,
    displayTables,
  } = useContext(AuthContext);

  let startTime = "";
  console.log(adminTables);
  adminTables.find((element, index) => {
    if (element.status === "CLOSED" && index === 1) {
      startTime = `${element.date} ${element.time} `;
    }
  });

  let closeTime = "";

  adminTables.find((element, index, arr) => {
    if (element.status === "CLOSED" && index === arr.length - 1) {
      closeTime = `${element.date} ${element.time} `;
      console.log(closeTime)
    }
  });


  adminTables.filter((element, index, arr) => {
    let closeTime2 = ""
    if (element.status === "CLOSED") {
      closeTime2 = `${element.date} ${element.time} `;
      console.log(closeTime2)
    }
  });

  const activeUser = user.username;
  const activePasscode = user.passcode;
  useEffect(() => {
    if (user.role === "Super Admin" || user.role === "Administrator") {
      displayAdminTables(activeUser, activePasscode);
    } else {
      displayTables(activeUser);
    }
  }, [activeUser, activePasscode]);

  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  return (
    <div style={{ background: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            fontSize: "2rem",
            margin: "0 auto",
            paddingTop: "3rem",
            justifySelf: "center",
          }}
        >
          General Report
        </h1>
        <div className="general__reportDate">{date}</div>
      </div>


      <div className="general__reportTable">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingLeft: "2rem",
          }}
        >
          <div style={{fontSize:"1.2rem"}}><span>Start Time:</span> <b>{startTime}</b></div>
          <div style={{ fontSize: "1.2rem" }}>
            <span>Bar Total:</span> <b>N{barTotal.toLocaleString("en-US")}</b>
          </div>
          <div style={{ fontSize: "1.2rem" }}>
            <span>Lounge Total:</span>{" "}
            <b>N{loungeTotal.toLocaleString("en-US")}</b>
          </div>
          <hr></hr>
          <div style={{ fontSize: "1.2rem" }}>
            <b>
              <span>Total Revenue: </span>N
              {adminTotalRevenue.toLocaleString("en-US")}{" "}
            </b>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingRight: "2rem",
          }}
        >
          <div style={{ fontSize: "1.2rem" }}>
            <span>Closing Time:</span> <b>{closeTime}</b>
          </div>
          <div style={{ fontSize: "1.2rem" }}>
            <span>Cash Payments:</span>{" "}
            <b>N{adminCashPayments.toLocaleString("en-US")} </b>
          </div>
          <div style={{ fontSize: "1.2rem" }}>
            <span>POS Payments:</span>{" "}
            <b>N{adminPosPayments.toLocaleString("en-US")} </b>
          </div>
          <div style={{ fontSize: "1.2rem" }}>
            <span>Transfer Payments:</span>{" "}
            <b>N{adminTransferPayments.toLocaleString("en-US")}</b>
          </div>

          </div>

          </div>

{bar.length === 0  && lounge.length === 0 && <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><h1 style={{fontSize:"2rem"}}>No Report Available</h1></div>}

{ bar.length > 0 && <div >
  <h1 style={{textAlign:"center", marginTop:"2rem", paddingBottom:"1rem"}}>Bar</h1>
  <div className="table__header report__table">
    <div  className="table__row ">Desc</div>
    <div className="table__row">Price</div>
    <div className="table__row">Quantity</div>
    <div className="table__row">Sub-Total</div>
  </div>

  {bar.map((data, index) => (
    <div className="report__table" style={{display:"flex", flexDirection:"row"}} key={index}>
      <div className="table__row">{data.item.toLocaleString("en-US")}</div>
      <div className="table__row">N{data.price.toLocaleString("en-US")}</div>
      <div className="table__row">{data.quantity.toLocaleString("en-US")}</div>
      <div className="table__row">N{data.subtotal.toLocaleString("en-US")}</div>
    </div>
  ))}
</div>}

{lounge.length > 0 && <div >
  <h1 style={{textAlign:"center", marginTop:"2rem", paddingBottom:"1rem"}}>Lounge</h1>
  <div className="table__header report__table">
    <div  className="table__row">Desc</div>
    <div className="table__row">Price</div>
    <div className="table__row">Quantity</div>
    <div className="table__row">Sub-Total</div>
  </div>

  
  {lounge.map((data, index) => (
    <div className="report__table" style={{display:"flex", flexDirection:"row"}} key={index}>
      <div className="table__row">{data.item.toLocaleString("en-US")}</div>
      <div  className="table__row">N{data.price.toLocaleString("en-US")}</div>
      <div  className="table__row">{data.quantity.toLocaleString("en-US")}</div>
      <div  className="table__row">N{data.subtotal.toLocaleString("en-US")}</div>
    </div>
  ))}
</div>}

    </div>
  );
}

export default GeneralReportPage;
