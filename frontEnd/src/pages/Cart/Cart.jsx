import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storeContex";
import {useNavigate} from "react-router-dom";
const Cart = () => {
  const { cartItem, food_list, removeFromCart ,getTotalCartAmount,url} = useContext(StoreContext);
const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          //cartItem stores key as item id and value as quantity if the quantity is greater than 0 then we show in the cart
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  {/* give the quantity */}
                  <p>{cartItem[item._id]}</p>
                  {/* give the total price : 1 item price * total quantity */}
                  <p>${item.price * cartItem[item._id]}</p>
                  <p className="cross" onClick={()=> removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivary Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button  onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have Promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
