import React, { useState, useContext, useEffect } from "react";
import AuthContext from '../../../context/AuthContext'



function GeneralReportPage({ report, total, bar, lounge, barTotal, loungeTotal}) {

  const {adminCashPayments,
    adminPosPayments,
    adminTransferPayments,
    adminTotalRevenue, user, displayAdminTables, displayTables} = useContext(AuthContext);

    const activeUser = user.username;
    const activePasscode = user.passcode;
    useEffect(() => {
      if (user.role === "Super Admin") {
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
    <div  style={{background:"white"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <h1 style={{ fontSize: "2rem", margin:"0 auto", paddingTop:"3rem",justifySelf:"center"}}>General Report</h1>
                <div style={{fontSize:"1.5rem", paddingTop:"3rem", textDecoration:"underline"}}>{date}</div>
                </div>
              
              <div style={{display:"flex", justifyContent:"space-between", paddingTop:"5rem", paddingBottom:"1rem"}}>
              <div style={{display:"flex", flexDirection:"column", gap:"2rem", paddingLeft:'2rem'}}>
              <div style={{fontSize:"1.2rem"}}><b><span>Bar Total:</span> N{barTotal.toLocaleString("en-US")}</b></div>
              <div style={{fontSize:"1.2rem"}}><b><span>Lounge Total:</span> N{loungeTotal.toLocaleString("en-US")}</b></div>
              <div style={{fontSize:"1.2rem"}}><b><span>Total Revenue: </span>N{adminTotalRevenue.toLocaleString("en-US")} </b></div>
                </div>
 
              <div style={{display:"flex", flexDirection:"column", gap:"2rem", paddingRight:'2rem'}}>
              <div style={{fontSize:"1.2rem"}}><b><span>Cash Payments:</span> N{adminCashPayments.toLocaleString("en-US")} </b></div>
              <div style={{fontSize:"1.2rem"}}><b><span>POS Payments:</span> N{adminPosPayments.toLocaleString("en-US")} </b></div>
              <div style={{fontSize:"1.2rem"}}><b><span>Transfer Payments:</span> N{adminTransferPayments.toLocaleString("en-US")}</b></div>

              </div>
           
              </div>

      <div >
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
      </div>

      <div >
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
      </div>


    </div>
  );
}

export default GeneralReportPage;
