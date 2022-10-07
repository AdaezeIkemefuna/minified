

import React from "react";
import {useState} from "react";
import AuthContext from "../../context/AuthContext";
import { MdDeleteOutline } from "react-icons/md";
import {BsPencilSquare} from "react-icons/bs";
import EditPriceModal from "../../components/modal/EditPriceModal";
import DeleteItemModal from "../../components/modal/DeleteItemModal";
import "../../components/modal/Modal.css";


const MenuBarSingleproduct = ({ items }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const [deleteMode, setDeleteMode] = useState(false);
  const handleDelete = () => {
    setDeleteMode(true);
  };


  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setEditMode(false);
      setDeleteMode(false);
    }
  };
  return (

    <div className="menu-item">

{editMode && (
        <div
          className={editMode ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
          <EditPriceModal item={items} setEditMode={setEditMode} closeModal={closeModal} />
          </div>
        </div>
      )}

      {deleteMode && (
        <div
          className={deleteMode ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DeleteItemModal item={items}  setDeleteMode={setDeleteMode} closeModal={closeModal} />
          </div>
        </div>
      )}
      <p style={{ fontSize: "1rem" }}>{items.department}</p>
      <img
        src={items.image}
        alt={items.product}
        style={{ margin: "0.5rem 0rem"}}
        width={"50px"}
        height={"75px"}
      />
      <div className="item-info">
        <header>
          <h3>{items.product}</h3>
          <h4 className="price">₦{items.price}</h4>
        </header>
      </div>
      <div style={{display:"flex"}}>

      <button
          className="edit__price" 
          onClick={handleEdit}
          style={{border:"none"}}
        >
         <BsPencilSquare
         size={23}
         />
        </button>

        <button
          onClick={handleDelete}
          className="delete__item"
          style={{border:"none"}}
        >
         <MdDeleteOutline
         size={23}
           
           
          />
        </button>
      </div>
        
    </div>
  );
};

export default MenuBarSingleproduct;
