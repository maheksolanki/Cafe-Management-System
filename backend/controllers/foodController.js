import foodModel from "../models/foodModel.js";
import fs from 'fs'

//api to use add the data in database
const addFood = async(req,res) =>{

  let image_filename = `${req.file.filename}`; //using this variable we take uploaded file name

  const food = new foodModel({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,
    category : req.body.category,
    image : image_filename
  })
  // this save method is used to save the data in database
  try{
    await food.save();
    res.json({success : true , message : "Food added!"})
  }catch(error){
    console.log(error);
    res.json({success : false , message : "Error!"});
  }
}

//api to show all food list

const listFood = async(req,res) =>{
  try{
    const foodItems= await foodModel.find({});
    res.json({success : true , data : foodItems});
  }catch(error){
    console.log(error);
    res.json({success :false , message : "Error"});
  }
}

//api to remove food item

const removeFoodItem = async(req,res) =>{
  try{
    const food = await foodModel.findById(req.body.id); // this line use to find selected item from model
    fs.unlink(`uploads/${food.image}`,()=>{}); // this line is used to find selected images from folder and deleted

    await foodModel.findByIdAndDelete(req.body.id); // this is used to delet the selected item from our database.
    res.json({success : true , message : "Food Remove"});
  }catch(error){
    console.log(error);
    res.json({success : false , message : "Error"});
  }
}
export {addFood,listFood,removeFoodItem}