import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineInventory,
  MdOutlineTableChart,
  MdDashboardCustomize,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import "./Sidebar.css";
import "../modal/Modal.css";
import AuthContext from "../../context/AuthContext";
import AdminModal from "../modal/AdminModal";
import { useState } from "react";

const SideBar = () => {
  const { user, showSideBar, toggleSideBar, toggleCartMenu, logoutUser } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const activeStyle = {
    backgroundColor: "var(--primary-color)",
    color: "var(--yellow)",
    fontWeight: "bold",
  };

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setShowModal(false);
    }
  };
  const settingsAction = () => {
    toggleCartMenu(false);
    setShowModal(true);
    setActiveTab("settings");
  };

  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  const [activeTab, setActiveTab] = useState("orders");
  return (
    <>
      {showModal && (
        <div
          className={showModal ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <AdminModal setShowModal={setShowModal} />
        </div>
      )}
      <div className="nav__container desktop">
        <div className="nav__logo">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="nav__wrapper">
          <NavLink
            to={"/orders"}
            style={activeTab === "orders" ? activeStyle : undefined}
            onClick={() => {
              setActiveTab("orders");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineInventory size={25} />
            {user.role === "Super Admin" || user.role === "Administrator"
              ? "Menu Manager"
              : "New Orders"}
          </NavLink>

          <NavLink
            to={"/dashboard"}
            style={activeTab === "dashboard" ? activeStyle : undefined}
            onClick={() => {
              setActiveTab("dashboard");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineTableChart size={25} />
            Table Manager
          </NavLink>

          {(user.role === "Super Admin" || user.role === "Administrator") && (
            <div
              style={activeTab === "settings" ? activeStyle : undefined}
              onClick={settingsAction}
              className="sidebar-link"
            >
              <FiSettings size={25} />
              Settings
            </div>
          )}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/inventory"}
              style={activeTab === "inventory" ? activeStyle : undefined}
              onClick={() => {
                setActiveTab("inventory");
              }}
              className="sidebar-link"
            >
              <MdDashboardCustomize size={25} />
              Inventory Management
            </NavLink>
          ) : undefined}

          <NavLink
            to={"/"}
            style={activeTab === "logout" ? activeStyle : undefined}
            onClick={() => {
              logoutUser();
            }}
            className="sidebar-link"
          >
            <BiLogOut size={25} />
            Logout
          </NavLink>
        </div>
        <div className="nav__logo uppist">
          <small style={{ textTransform: "uppercase", fontWeight: "600" }}>
            powered by
          </small>
          <br />
          <img src="/1.png" alt="" />
        </div>
      </div>

      <div className="nav__container mobile">
        <div className={showSideBar ? "position" : "no-display"}>
          <FaTimes size={25} onClick={menuAction} />
        </div>
        <div className="nav__logo">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="nav__wrapper">
          <NavLink
            to={"/orders"}
            style={activeTab === "orders" ? activeStyle : undefined}
            onClick={() => {
              toggleSideBar(!showSideBar);
              setActiveTab("orders");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineInventory size={25} />
            {user.role === "Super Admin" ||
            user.role === "Supervisor" ||
            user.role === "Administrator"
              ? "Menu Manager"
              : "New Orders"}
          </NavLink>

          <NavLink
            to={"/dashboard"}
            style={activeTab === "dashboard" ? activeStyle : undefined}
            onClick={() => {
              toggleSideBar(!showSideBar);
              setActiveTab("dashboard");
            }}
            className={
              user.role === "Store Manager"
                ? "sidebar-link null"
                : "sidebar-link"
            }
          >
            <MdOutlineTableChart size={25} />
            Table Manager
          </NavLink>

          {user.role === "Super Admin" ||
            (user.role === "Administrator" && (
              <div
                style={activeTab === "settings" ? activeStyle : undefined}
                onClick={settingsAction}
                className="sidebar-link"
              >
                <FiSettings size={25} />
                Settings
              </div>
            ))}

          {user.role === "Super Admin" ||
          user.role === "Store Manager" ||
          user.role === "Administrator" ? (
            <NavLink
              to={"/inventory"}
              style={activeTab === "inventory" ? activeStyle : undefined}
              onClick={() => {
                toggleSideBar(!showSideBar);
                setActiveTab("inventory");
              }}
              className="sidebar-link"
            >
              <MdDashboardCustomize size={25} />
              Inventory Management
            </NavLink>
          ) : undefined}

          <NavLink
            to={"/"}
            style={activeTab === "logout" ? activeStyle : undefined}
            onClick={() => {
              logoutUser();
            }}
            className="sidebar-link"
          >
            <BiLogOut size={25} />
            Logout
          </NavLink>
        </div>
        <div className="nav__logo uppist">
          <small style={{ textTransform: "uppercase", fontWeight: "600" }}>
            powered by
          </small>
          <br />
          <img src="/1.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
