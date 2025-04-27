import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';
const Add = ({url}) => {

  const [image,setImage] = useState(false);
  const [data, setData] = useState({
    name : "",
    description : "",
    price : "",
    category : "Salad"
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name] : value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    const formData = new FormData();//FormData is a built-in JavaScript object used to easily construct a set of key/value pairs representing form fields and their values. It is commonly used for sending form data to a server using XMLHttpRequest or the fetch API.
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);

    //now we call the api using Axious
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      //if data added successfull then we reset all fill to add another data
      setData({
        name : "",
        description : "",
        price : "",
        category : "Salad"
      })
      setImage(false);
      toast.success(response.data.message); //this message write n backend api when it added successfully
    }else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col" >
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            {/* this URL.createObjectURL(image) is use to show preview of selected image */}
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value= {data.name} type="text" name = 'name' placeholder='Type Here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value = {data.description}name="description" rows='6' placeholder='Write Content Here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodels">Noodels</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
