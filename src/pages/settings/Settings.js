import "./Settings.css";
import { Link } from "react-router-dom";
import TopMenu from "../../components/topbar/TopMenu";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Settings = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <TopMenu />
      <div>
        <div className="settings__wrapper">
          {user.role === "Super Admin" && (
            <Link to="/settings/staff" className="staff__manager">
              staff Manager
            </Link>
          )}
          <Link to="/settings/reports" className="reports">
            reports
          </Link>
        </div>
      </div>
    </>
  );
};

export default Settings;
