import userModel from "../models/userModel.js";

//add item to user cart

const addToCart = async (req,res) =>{
  try{
    let userData = await userModel.findById(req.body.userId); // je user login kare te userna account ma cart ma item add karva mate user id ne use kariye che
    let cartData = await userData.cartData; // cartData ma particulaer user na cart ma je item che te store kare chhe initialy empty che
    if(!cartData[req.body.itemId]){ //if cart is empty then add this one item
      cartData[req.body.itemId] = 1;
    }else{
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData: cartData});
    res.json({success : true , message : "Item added to cart"});
  }catch(error){
    console.log(error);
    res.json({success : false , message : "Error in adding item to cart"});
  }
}
//Note : cartData name no aek empty object che je userModel create karta time par banavel chhe ahi tej empty object ma item add kariae chhe.

//remove item from user cart
const removeFromCart = async (req,res) =>{
  try{
    let userData = await userModel.findById(req.body.userId);//this find the logedin user
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId] > 0){
      cartData[req.body.itemId] -= 1;
    }
    else if(cartData[req.body.itemId] === 0){
      res.json({success : false , message : "Item already removed from cart"});
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success: true , message : "Removed From cart"})

  }catch(error){
    console.log("errot");
    res.json({success : false,message :"Error"});
  }
}

//fetch item from user cart

// const getCartData = async (req,res) =>{
//   try{
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     res.json({success : true , cartData});
//   }catch(error){
//     console.log(error);
//     res.json({success: false, message : "Error!"});
//   }
// }
const getCartData = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); // Fetch user data by ID
    if (!userData) {
      return res.json({ success: false, message: "User not found" }); // Handle case where user is not found
    }
    let cartData = userData.cartData; // Access cartData directly without await
    res.json({ success: true, cartData }); // Return cart data
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart data" }); // Handle errors
  }
};
export {addToCart,removeFromCart,getCartData}
