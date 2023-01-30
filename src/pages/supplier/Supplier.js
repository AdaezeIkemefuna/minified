import SupplierDashboard from "./SupplierDashboard";
import { useContext, useEffect, useState } from "react";
import TableContext from "../../context/TableContext";
import {BsFillPersonFill, BsFillTelephoneFill} from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {useNavigate} from "react-router-dom"



function Supplier() {

  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  const {
    activeItem, 
    setActiveItem,
    searchResult, 
    setSearchResult
  } = useContext(TableContext);



  const products = [
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size:"1L",
      unit:"10000",
      total:"100000",
      date:"12/12/2021",
    }
  ]



  const getAllSuppliers = async () => {
    try {
      const response = await fetch(`https://uppist-server.onrender.com/supply/suppliers`);
      const data = await response.json();
      setSuppliers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(suppliers);

  useEffect(() => { 
    getAllSuppliers();
  }, []);

  const changeFavourite = (item) => {
    // let newArray = [...supplyArray]
    // newArray[item].isFavourite = !newArray[item].isFavourite
    // setSupplyArray(newArray)
  }

  return (
    <div className="form__wrapper supply__wrapper">
      <SupplierDashboard/>
      {activeItem === "SUPPLIER" ? (
        <div style={{marginTop:"21rem"}} className="supply__card">
        {suppliers?.map((item, index) => (
         <div key={index} className="card">
         < BsFillPersonFill color="#ec9c04" size={35}/>
          <span className="card__name">{item?.name}</span>
          <span  className="card__dept">{item.product ? item.product : "No Product"}</span>
          <div  className="card__phone">
          <BsFillTelephoneFill  size={20}/>
          <span>{item.phone}</span>
          </div>
          <div
               className="card__action2">
            <button  onClick={() => {
                  navigate(`/supplier/${item.name}`);
                }}>Take Action</button>
          {item.isFavourite ?  <AiFillStar onClick={() =>changeFavourite(index)} color="#ec9c04" size={25}/> : <AiOutlineStar onClick={() => changeFavourite(index)}  size={25} />} 
          </div>
         </div>
        ))}
        </div>
      ) :
      
      <table  style={{marginTop:"21rem"}} className="ims__table">
      <thead className="ims__thead supply__head">
        <tr className="table__header__ims">
          <th>No</th>
          <th>Item Names</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Unit Price</th>
          <th>Total Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        
          {products.map((item) => (
            <tr className="ims__body">
            <td>{item.no}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.size}</td>
            <td>{item.unit}</td>
            <td>{item.total}</td>
            <td>{item.date}</td>
            </tr>
          ))}
        
      </tbody>
      </table>}


    </div>
  )
}

export default Supplier
