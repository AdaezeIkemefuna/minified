import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IndividualReportPage from "./IndividualReportPage";
import AuthContext from "../../../context/AuthContext";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";

function IndividualReportPerWaiter() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const { waiter, toastOptions } = useContext(AuthContext);
  const [report, setReport] = useState([]);
  const establishment = "Dbase";

  // FUNCTION TO GET WAITER
  const getWaiterReport = async (waiter) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/individual-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            waiter,
          }),
        }
      );
      const data = await response.json();
      // A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
      // filter property bar
      sortDuplicateValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWaiterReport(waiter);
  }, []);

  //  A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
  function sortDuplicateValues(data) {
    let arr = data;

    let resultWithSubTotal = mergeDuplicates(arr).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));
    setReport(resultWithSubTotal);
  }

  function mergeDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (i !== j) {
          if (
            array[i].item === array[j].item &&
            array[i].price === array[j].price
          ) {
            // remove both matching duplicates and create a new array
            let new_array = array.filter((item, index) =>
              index === i || index === j ? null : item
            );
            // add a sample of duplicate items with quantity merged together
            new_array.push({
              item: array[i].item,
              price: array[i].price,
              quantity: array[i].quantity + array[j].quantity,
            });

            return mergeDuplicates(new_array);
          }
        }
      }
    }
    return array;
  }

  const individualReportPageRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: [1300, 1300],
      unit: "px",
      compress: true,
    });

    // Adding the fonts
    doc.setFont("Lucida Sans Unicode");

    doc.html(individualReportPageRef.current, {
      async callback(doc) {
        let blobFile = doc.output("blob");
        const dateCreated = new Date().toLocaleDateString("en-GB");
        let dateModified = dateCreated.toString().replace(/\//g, "-");
        const myFile = new File(
          [blobFile],
          `${waiter}-${establishment}-${dateModified}.pdf`,
          {
            type: "application/pdf",
          }
        );

        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("file", dateModified);
        axios
          .post("https://pos-server1.herokuapp.com/upload-report", formData)
          .then((res) => {
            if (res.ok) {
              getWaiterReport(waiter);
              toast.success("Report Uploaded Successfully", toastOptions);
            }
          });
      },
    });
  };

  function handledChange(event) {
    setDate(event.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    let serverDate = date;
    serverDate = serverDate.split("-").reverse().join("-");
    getPdfByDate(serverDate);
  }

  // A Function To GET PDF OF A USER SELECTED DATE

  const getPdfByDate = async (date) => {
    const client = `${waiter}-${establishment}`;
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/retrieve-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client,
            date,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(`PDf sent successfully`, toastOptions);
        window.open(`${data.pdf}`);
      } else if (response.status === 404) {
        toast.error(`Pdf With This Date, This not Exist`, toastOptions);
      } else {
        toast(`Failed to get Pdf`, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  TOTAL PRODUCTS SOLD
  let total = report.reduce((acc, curr) => {
    return acc + +curr.subtotal;
  }, 0);

  return (
    <div>
      <div
        className="add__header"
        style={{
          display: "flex",
          margin: "2rem",
          justifyContent: "space-between",
        }}
      >
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={25} />
          <p className="goback__text">Go Back</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="reportbuttons" onClick={handleGeneratePdf}>
            Upload Report
          </button>

          <button
            className="reportbuttons"
            onClick={() => setShowModal((prevValue) => !prevValue)}
          >
            Download Report
          </button>
        </div>
      </div>

      <div ref={individualReportPageRef}>
        <IndividualReportPage report={report} total={total} waiter={waiter} />
      </div>

      <div className={showModal ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Enter Report Date</h3>
          </div>

          <div className="modal__body">
            <form onSubmit={handleSumbit} className="staff__modal">
              <input
                type="date"
                name="date"
                value={date}
                onChange={handledChange}
                className="modal__input"
              />

              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                className="modal__buttons"
              >
                <button
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="button"
                >
                  Get Pdf
                </button>

                <input
                  className="close__button"
                  type="button"
                  value="Close"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualReportPerWaiter;
