import { useContext, useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import AuthContext from "../../../context/AuthContext";
import "../Modal.css";
import { FaMinus } from "react-icons/fa";
import TableContext from "../../../context/TableContext";

const Orders = ({ order, table_name }) => {
  const { item, quantity } = order;
  const { dispatch, getAdminDetails, getBarman } = useContext(TableContext);
  const { user, getDetails, toastOptions } = useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const product = item.product;
  const role = user.role;

  const [table, setTable] = useState([]);

  useEffect(() => {
    const tab = JSON.parse(localStorage.getItem("table"));
    if (tab) {
      setTable(tab);
    }
  }, []);

  //DELETE ITEM
  const deleteItem = () => {
    deleteItemCall(activeUser, activePasscode, product, table_name);
  };

  const deleteItemCall = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/delete-order",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            product,
            table_name,
          }),
        }
      );
      if (response.status === 200) {
        if (user.role === "Super Admin") {
          getAdminDetails(activeUser, activePasscode, role, table_name);
        } else if (user.role === "Bar Man") {
          getBarman(activeUser, activePasscode, table_name);
        } else {
          getDetails(activeUser, activePasscode, table_name);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <tr className="row__data">
        <td className="td">{item.product}</td>
        <td className="td">₦{item.price}</td>
        <td className="td">
          {table.status === "OPEN" && (
            <>
              {user.role === "Super Admin" && (
                <FaMinus
                  onClick={() => {
                    dispatch({
                      type: "DECREMENT_ORDER",
                      payload: order,
                    });
                  }}
                  size={15}
                  color="#080808"
                  className="receiptQty_btn"
                />
              )}
              {user.role === "Bar Man" && (
                <FaMinus
                  onClick={() => {
                    dispatch({
                      type: "DECREMENT_BARMANORDER",
                      payload: order,
                    });
                  }}
                  size={15}
                  color="#080808"
                  className="receiptQty_btn"
                />
              )}
            </>
          )}
          {quantity}
        </td>

        <td className="td">₦{quantity * item.price}</td>

        <td className="td">
          {table?.status === "CLOSED" ? undefined : (
            <>
              {user.role === "Super Admin" && (
                <MdDeleteOutline
                  size={20}
                  style={{ marginTop: "2px" }}
                  color="red"
                  onClick={deleteItem}
                />
              )}

              {user.role === "Bar Man" && (
                <MdDeleteOutline
                  size={20}
                  style={{ marginTop: "2px" }}
                  color="red"
                  onClick={deleteItem}
                />
              )}
            </>
          )}
        </td>
      </tr> */}
    </>
  );
};

export default Orders;
