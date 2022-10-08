import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import "./TopBar.css";

const TopBar = () => {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  const { searchQuery, setSearchQuery, toggleSideBar, toggleCartMenu } =
    useContext(AuthContext);
  const {
    state: { cart },
    user,
  } = useContext(AuthContext);

  const menuActions = () => {
    toggleSideBar((prevValue) => !prevValue);
    toggleCartMenu(false);
  };
  return (
    <div className="topbar__container">
      <div className="menu__icons">
        <GoThreeBars size={25} onClick={menuActions} />
      </div>

      <form>
        <FaSearch size={20} className="search__icon" />
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="date">{date}</div>
    </div>
  );
};

export default TopBar;
