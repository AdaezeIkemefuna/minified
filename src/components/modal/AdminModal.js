import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function AdminModal({ setShowModal }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { user, toastOptions } = useContext(AuthContext);
  const activePasscode = user.passcode;
  const handleAuthorization = (e) => {
    e.preventDefault();
    if (+code !== activePasscode) {
      toast(`Unauthorized`, toastOptions);
      setShowModal(false);
    } else {
      setShowModal(false);
      navigate("/settings");
    }
  };
  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setShowModal(false);
    }
  };
  return (
    <div id="bg" onClick={closeModal}>
      <div className="modal__center1">
        <div className="admin__pad">
          <h2>Enter Passcode</h2>
          <form onSubmit={handleAuthorization}>
            <input
              type="number"
              placeholder="Type here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="modal__input"
            />
            <button style={{ marginTop: "0.5rem", color: "white" }}>
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
