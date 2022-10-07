import React from "react";

function IndividualReportPage({ report, total, waiter }) {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  return (
    <div style={{ background: "white" }}>
      <h1
        style={{ fontSize: "2rem", textAlign: "center", paddingTop: "3rem" }}
      >{`${waiter}'s Individual Report`}</h1>
      <div
        style={{
          display: "flex",
          divlexDirection: "row",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        <div style={{ paddingLeft: "2rem", fontSize: "1.5rem" }}>
          <b>Total: N{total.toLocaleString("en-US")}</b>
        </div>
        <div
          style={{
            paddingRight: "2rem",
            fontSize: "1.5rem",
            textDecoration: "underline",
          }}
        >
          <b>{date}</b>
        </div>
      </div>
      <div>
        <div className="table__header report__table">
          <div className="table__row">Description</div>
          <div className="table__row">Price</div>
          <div className="table__row">Quantity</div>
          <div className="table__row">Sub-Total</div>
        </div>

        {report.map((data, index) => (
          <div className="report__table" key={index}>
            <div className="table__row">
              {data.item.toLocaleString("en-US")}
            </div>
            <div className="table__row">{`N ${data.price.toLocaleString(
              "en-US"
            )}`}</div>
            <div className="table__row">{data.quantity}</div>
            <div className="table__row">{`N ${data.subtotal.toLocaleString(
              "en-US"
            )}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndividualReportPage;
