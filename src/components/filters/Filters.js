import React, { useState, useEffect, useContext } from "react";
import "./Filters.css";
import AuthContext from "../../context/AuthContext";
import { MdWineBar } from "react-icons/md";
import TableContext from "../../context/TableContext";

const Filters = () => {
  const {
    deptState: { dept },
    deptDispatch,
  } = useContext(TableContext);
  const {
    activeCategory,
    setActiveCategory,
    displayItems,
    state: { items },
    dispatch,
    setSearchQuery,
    showFilters,
    toggleFilters,
  } = useContext(AuthContext);
  const [activeDept, setActiveDept] = useState(dept);

  // const categories = ["all", ...new Set(items.map((item) => item.category))];
  const categories = [
    "all",
    "beers",
    "wines",
    "cigarretes",
    "spirits",
    "soups",
  ];

  useEffect(() => {
    changeItems();
  }, [dept]);

  function changeItems() {
    if (items) {
      dispatch({ type: "CLEAR_ITEMS" });
      displayItems(dept);
    }
  }

  return (
    <div className="filter__container">
      {showFilters && (
        <div id="filter__wrapper">
          {/* <p className="category_title"></p> */}
          <div className="radio-buttons">
            <span
              className={`${activeDept === "Bar" ? "active--filter" : ""}`}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                marginRight: "5px",
              }}
              onClick={() => {
                setActiveDept("Bar");
                deptDispatch({
                  type: "BAR",
                });
              }}
            >
              Bar
            </span>

            <span
              className={`${activeDept === "Lounge" ? "active--filter" : ""}`}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                marginRight: "5px",
              }}
              onClick={() => {
                setActiveDept("Lounge");
                deptDispatch({
                  type: "LOUNGE",
                });
              }}
            >
              Lounge
            </span>
          </div>

          <div className="btn-container">
            {categories.map((category, index) => {
              return (
                <div
                  className={`${
                    activeCategory === category ? "active--filter" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(category);
                    toggleFilters();
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
