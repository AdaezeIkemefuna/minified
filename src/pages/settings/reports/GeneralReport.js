import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import "../Settings.css";
import GeneralReportPage from "./GeneralReportPage";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import { MdOutlineArrowBackIos } from "react-icons/md";

const GeneralReport = () => {
  const [showModal, setShowModal] = useState(false);
  const { toastOptions } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [bar, setBar] = useState([]);
  const [lounge, setLounge] = useState([]);
  const navigate = useNavigate();

  const client = "Dbase";

  var width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  // A USE EFFECT FUNCTION THAT FETCHES ALL DATA FROM THE DATABASE
  useEffect(() => {
    const url = `https://pos-server1.herokuapp.com/overall-reports`;
    const getAllReports = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
        // filter property bar
        sortDuplicateValues(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllReports();
  }, []);

  const generalReportPageRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: [width, width],
      unit: "px",
      compress: true,
    });

    // Adding the fonts
    doc.setFont("helvetica");

    doc.html(generalReportPageRef.current, {
      async callback(doc) {
        let blobFile = doc.output("blob");
        const dateCreated = new Date().toLocaleDateString("en-GB");
        let dateModified = dateCreated.toString().replace(/\//g, "-");
        const myFile = new File([blobFile], `${client}-${dateModified}.pdf`, {
          type: "application/pdf",
        });

        const formData = new FormData();
        formData.append("file", myFile);
        formData.append("file", dateModified);

        axios
          .post("https://pos-server1.herokuapp.com/upload-report", formData)
          .then((res) => {
            toast.success("Report Uploaded Successfully", toastOptions);
          });
      },
    });
  };

  // A FUNCTION TO SORT DUPLICATE ITEMS AND ADD THEIR QUANTITY/PRICE
  function sortDuplicateValues(data) {
    let arr = data;

    // filter property bar
    const results = arr.filter((bar) => {
      return bar.department === "Bar";
    });

    // filter property lounge
    const results2 = arr.filter((lounge) => {
      return lounge.department === "Lounge";
    });

    let BarResultWithSubTotal = mergeDuplicates(results).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));

    let LoungeResultWithSubTotal = mergeDuplicates(results2).map((obj) => ({
      item: obj.item,
      quantity: obj.quantity,
      price: obj.price,
      subtotal: obj.price * obj.quantity,
    }));

    setBar(BarResultWithSubTotal);
    setLounge(LoungeResultWithSubTotal);
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

  function handledChange(event) {
    setDate(event.target.value);
  }

  function handleSumbit(e) {
    e.preventDefault();
    let serverDate = date;
    // Converting Date from yymmdd format to day-month-year format
    serverDate = serverDate.split("-").reverse().join("-");
    getPdfByDate(client, serverDate);
  }

  // A Function To GET PDF OF A USER SELECTED DATE
  const getPdfByDate = async (client, date) => {
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

  // TOTAL PRODUCTS SOLD BAR
  let totalBar = bar.reduce((acc, curr) => {
    return acc + +curr.subtotal;
  }, 0);

  // TOTAL PRODUCTS SOLD LOUNGE
  let totalLounge = lounge.reduce((acc, curr) => {
    return acc + +curr.subtotal;
  }, 0);

  return (
    <div className="main__report">
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

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

      <div ref={generalReportPageRef}>
        <GeneralReportPage
          bar={bar}
          lounge={lounge}
          barTotal={totalBar}
          loungeTotal={totalLounge}
        />
      </div>

      <div className={showModal ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Enter Report Date
            </h3>
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

              <div className="modal__buttons">
                <button
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="button"
                >
                  Get Pdf
                </button>

                <input
                  type="button"
                  value="Close"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralReport;
