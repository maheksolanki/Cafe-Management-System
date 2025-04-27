import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {

  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data); //res.data is the inbuilt but .data is backend json key in which our data is stored
    } else {
      toast.error("Error When fetching the data!");
    }
  };

  //this call the function one time when this page is rendered
  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async(foodId) =>{
    // console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id : foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else
    {
      toast.error("Error");
    }
  }
  return (
    <div className="list add flex-col">
      <p className="all">All Foods List</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-formate">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className="cursor">x</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
