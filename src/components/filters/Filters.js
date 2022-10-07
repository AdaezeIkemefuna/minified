import React, { useState } from "react";
import "./Filters.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { MdWineBar } from "react-icons/md";
import TableContext from "../../context/TableContext";

const Filters = () => {
  const { input, setInput } = useContext(TableContext);
  const {
    activeCategory,
    setActiveCategory,
    displayItems,
    state: { items },
    dispatch,
  } = useContext(AuthContext);
  const categories = ["all", ...new Set(items.map((item) => item.category))];
  const [bar, toggleBar] = useState(true);
  const changeDept = () => {
    toggleBar(!bar);
  };

  const changeItems = () => {
    if (items) {
      dispatch({ type: "CLEAR_ITEMS" });
      displayItems(input);
    }
  };

  return (
    <div id="filter__wrapper">
      <div className="filter__head">
        <p className="category_title">Choose Category:</p>
        <label htmlFor="toggle" className="toggle">
          <input
            type="checkbox"
            className="toggle__input"
            id="toggle"
            value={bar ? "Bar" : "Lounge"}
            onChange={(e) => {
              setInput(e.target.value);
              changeDept();
              changeItems();
            }}
          />
          <div className="toggle__fill"></div>
        </label>
        <strong style={{ paddingLeft: "12px" }}>
          {bar ? "Bar" : "Lounge"}
        </strong>
      </div>

      <div className="btn-container">
        {categories.map((category, index) => {
          return (
            <button
              type="button"
              className={`${
                activeCategory === category
                  ? "filter-btn btn-active"
                  : "filter-btn"
              }`}
              key={index}
              onClick={() => setActiveCategory(category)}
            >
              <span className="filter__bar">
                <MdWineBar className="filter__icons" size={20} /> {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
