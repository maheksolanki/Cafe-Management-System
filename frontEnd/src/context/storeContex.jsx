import { createContext, useEffect, useState } from "react";
import axios from "axios";
//when we want to use context api import this StoreContext
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  // here state veriable stores object
  const [cartItem, setCartItem] = useState({});
  const url = 'https://cafe-management-system-cqw8.onrender.com';
  const [token ,setToken] = useState("");
  const [food_list , setFoodList] = useState([]);


  //this is function to add sepecific item to cart
  const addToCart = async(itemId) => {
    if (!cartItem[itemId]) {  //id is not available
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));//spread operator to copy all the existing key-value pairs from prev into the new object
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //this is to acces the backend api to add item to cart in db
    if(token){
     await axios.post(url + "/api/cart/add",{itemId},{headers : {token}});
    }
  };

  //remove item form cart
  const removeFromCart = async(itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url + "/api/cart/remove" , {itemId},{headers : {token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if(itemInfo){
        totalAmount += itemInfo.price * cartItem[item]; // cartItem[item] =>quantity(number of perticular item)
        }
      }
    }
    return totalAmount;
  };

  //fetch food list from db
  const fetchFoodList = async() =>{
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  }

  const loadCartData = async(token) =>{
    const response = await axios.post(url + "/api/cart/get",{},{headers : {token}});
    setCartItem(response.data.cartData);
  }

  //this useffect hook for getting token from local storage so that we can't logout when we reload the web page
  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  },[]);

  const contextValue = {
    food_list, // food list import from assets.jsx file
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
