import { useNavigate } from "react-router-dom";
import "../Settings.css";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";

const IndividualReport = () => {
  const { toastOptions, setWaiter } = useContext(AuthContext);
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();

  // A USE EFFECT FUNCTION THAT FETCHES ALL DATA FROM THE DATABASE
  useEffect(() => {
    const url = `https://pos-server1.herokuapp.com/waiter-reports`;
    const getAllUsers = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsername(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  const getWaiterUsername = (user) => {
    setWaiter(user);
  };

  return (
    <div className="main__div">
      <div className="back__button" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos size={25} />
        <p className="goback__text">Go Back</p>
      </div>

      <div className="settings__wrapper">
        {username.map(
          (user) =>
            user.username !== null && (
              <Link to="/settings/reports/individual/individualreportperwaiter">
                <div
                  key={user.username}
                  onClick={() => getWaiterUsername(user.username)}
                >
                  <p>{user.username}</p>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default IndividualReport;
