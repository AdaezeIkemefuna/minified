import React from "react";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const UpdateButton = ({ closeModal }) => {
  const {
    state: { changedOrders, barmanOrders },
    getAdminDetails,
    getBarman,
  } = useContext(TableContext);
  const { user, toastOptions, getDetails } = useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const role = user.role;
  const [tab_name, setTabName] = useState("");

  useEffect(() => {
    const table = JSON.parse(localStorage.getItem("table"));
    if (table) {
      setTabName(table.table_name);
    }
  }, []);
  const updateQtyCall = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/apply-returns",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name: tab_name,
            order: changedOrders,
          }),
        }
      );
      if (response.status === 200) {
        // if (user.role === "Super Admin") {
        //   getAdminDetails(activeUser, activePasscode, role, tab_name);
        // }
        // else if (user.role === "Bar Man") {
        getBarman(activeUser, activePasscode, tab_name);
        // } else {
        //   getDetails(activeUser, activePasscode, tab_name);
        // }
      } else {
        toast.error("could not update quantity");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateQty = () => {
    updateQtyCall();
    console.log();
  };

  const updateQtyBarman = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/apply-returns",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name: tab_name,
            order: barmanOrders,
          }),
        }
      );
      if (response.status === 200) {
        if (user.role === "Bar Man") {
          toast.success("Quantity Updated", toastOptions);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateBarman = () => {
    updateQtyBarman();
  };
  return (
    <>
      {role === "Super Admin" && (
        <button className="receipt__btn" onClick={updateQty}>
          apply changes
        </button>
      )}
      {role === "Bar Man" && (
        <button className="receipt__btn" onClick={updateBarman}>
          apply changes
        </button>
      )}
    </>
  );
};

export default UpdateButton;
