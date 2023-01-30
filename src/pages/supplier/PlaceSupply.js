import React from 'react'
import {useNavigate} from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import AuthContext from '../../context/AuthContext';
import { toast } from "react-toastify";
import {useState, useContext} from "react"
import { useParams } from 'react-router-dom';

function PlaceSupply() {
  const navigate = useNavigate();
  const[currentPage, setCurrentPage] = useState(true);
  const { toastOptions, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const {customer } = useParams();

  console.log(customer)

  console.log(name,quantity, size, unit, unitPrice, totalPrice)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://uppist-server.onrender.com/supply/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: name,
            quantity: +quantity,
            size: +size,
            measure: unit,
            unitPrice: +unitPrice,
            total_price: +totalPrice,
            supplierName:customer
          }),
        }
      );
      if (response.ok) {
        toast.success(`New Supplier added successfully`, toastOptions);
        setLoading(false);
        setCurrentPage(prevValue => !prevValue);
      } else {
        toast.error(`Failed to Add Supplier`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  }

  return (
    <div className='supply__order__container form__wrapper'>
        <div className='supply__order__header'>
        <div onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
        </div>
       <h1>Place New Order</h1>
       </div>
        {currentPage ? (
          <>
                <p className='supply__add'>Add item details to place an order</p>
                <form className='supply__order__form' onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Enter Item Name' name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Quantity' name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group1'>
                 <input type="text" placeholder='Size'  name="size" value={size} onChange={(e) => setSize(e.target.value)}/>
                 <div className='input__wrapper'>
                   <select
                     className="supply__select"
                     onChange={(e) => setUnit(e.target.value)}
                     value={unit}
                     name="unit"
                     required
                   >
                     <option value="" hidden className="placeholderSelect">
                      Unit Of Measurement
                     </option>
                     <option value="L">L</option>
                     <option value="ML">ML</option>
                     <option value="KILO">KILO</option>
                     <option value="MILIGRAM">MILIGRAM</option>
                     <option value="GRAMS">GRAMS</option>
                   </select>
                 </div>
                 </div>
         
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='unitPrice'  value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='totalPrice' value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group'>
                 {loading ? <button  className='supply__order__form__button'>Loading...</button> : <button  className='supply__order__form__button'>Place Order</button>}
                 </div>
                 </form>
       </> )  : (
        <>
        <p className='supply__success'>Your Item Has Been Added Successfully</p>
        </> )
         }
 
    </div>
  )
}

export default PlaceSupply