import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

export default function AdminModal({ closeAll, closeAdminModal }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { user, toastOptions } = useContext(AuthContext);
  const activePasscode = user.passcode;
  const handleAuthorization = (e) => {
    e.preventDefault();
    if (+code !== activePasscode) {
      toast.warn(`Unauthorized`, toastOptions);
      closeAll();
    } else {
      closeAdminModal();
    }
  };

  return (
    <div id="bg">
      <div className="modal__center1">
        <div className="admin__pad">
          <h2>Enter Passcode</h2>
          <form onSubmit={handleAuthorization}>
            <input
              type="password"
              placeholder="Type here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="modal__input"
              autoFocus
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
