import React from "react";
import Orders from "../modal/allTables/Orders";
import Company from "../company/Company";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { orders, table, total, discount, grandTotal } = props;
  return (
    <div
      className="table__receipt"
      ref={ref}
      style={{ fontSize: "2rem", color: "black" }}
    >
      <h4>Table Bill: {table.table_name}</h4>
      <hr />
      <Company />
      <table style={{ color: "black" }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        {orders.map((t, index) => (
          <Orders
            order={t}
            key={index}
            table_name={table.table_name}
            orders={orders}
          />
        ))}
      </table>

      <div className="totals__data">
        <div>
          <span style={{ color: "blueviolet" }}>Total </span>{" "}
          <span style={{ color: "green" }}>₦{Math.round(total)}</span>
        </div>
        <div>
          <span>Discount </span>
          <span style={{ color: "red" }}>₦{Math.round(discount)}</span>
        </div>
        <div>
          <span style={{ color: "blueviolet" }}>GrandTotal </span>
          <span style={{ color: "green" }}>₦{Math.round(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
});
