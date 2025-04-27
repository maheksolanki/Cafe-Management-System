import React, {useContext} from 'react'
import { StoreContext } from '../../context/storeContex';
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { LuCircleMinus } from "react-icons/lu";


const FoodItem = ({id,name,price,description,image}) => {

// const [itemCount,setItemCount] = useState(0);
const {cartItem, addToCart,removeFromCart ,url} = useContext(StoreContext);
// console.log("this is my cart item : ",cartItem);
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className = "food-item-image" src={url +"/images/" +image} alt="" />
        {
          !cartItem[id] ? <IoAdd className='add' onClick={()=>addToCart(id)}/>:  
          <div className='food-item-counter'>
            <LuCircleMinus onClick={()=>removeFromCart(id)} className='minus-item'/> 
            <p>{cartItem[id]}</p>
            <IoMdAddCircleOutline onClick={()=> addToCart(id)} className='add-item'/>
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
