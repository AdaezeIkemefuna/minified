import React from 'react'
import {useNavigate} from "react-router-dom";
import {useState, useContext} from "react"
import {BsArrow90DegLeft} from "react-icons/bs";
import {BsFillPersonCheckFill} from "react-icons/bs";
import AuthContext from '../../context/AuthContext';
import { toast } from "react-toastify";



function NewSupplier() {
  const navigate = useNavigate();
  const[currentPage, setCurrentPage] = useState(true);
  const { toastOptions, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");


console.log(name,email, phone, gender, address, product)

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://uppist-server.onrender.com/supply/new-supplier",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier_name: name,
            email: email,
            phone: phone,
            gender: gender,
           address: address,
           product: product,
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
    <>
  
        <div className="transactions__backbutton__supply" onClick={() => navigate(-1)}>
          <BsArrow90DegLeft size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>



        <div className='supply__order__container form__wrapper'>
        <div className='supply__order__header'>
       <h1>Add New Supplier</h1>
       </div>
        {currentPage ? (
          <>
                <p className='supply__add'>Add item details to place an order</p>
                <form className='supply__order__form' onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Full name' name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="email" placeholder='Email address' name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group1'>
                 <input type="text" placeholder='Phone Number' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                 <div className='input__wrapper'>
                   <select
                     className="supply__select"
                     onChange={(e) => setGender(e.target.value)}
                     value={gender}
                     name="gender"
                     required
                   >
                     <option value="" hidden className="placeholderSelect">
                      Gender
                     </option>
                     <option value="M">Male</option>
                     <option value="F">Female</option>
                   </select>
                 </div>
                 </div>
         
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Address' name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Product' name="product" value={product} onChange={(e) => setProduct(e.target.value)}/>
                 </div>
                 <div className='supply__order__form__group2'>
                 <button  className='supply__order__form__button1'>Add Supplier</button>
                 <p onClick={() => navigate(-1)}  style={{background:"transparent", border:'1px solid var(--primary-color)', color:'var(--primary-color)', display:'flex'}} className='supply__order__form__button1' >Cancel</p>
                 </div>
                 </form>
       </> )  : (
        <>
        <div  className='supply__success__message'>
        < BsFillPersonCheckFill size={200} />
        <p>A New Supplier Has Been Added Successfully</p>
        </div>
        </> )
         }
 
    </div>
    </>
   
  )
}

export default NewSupplier;