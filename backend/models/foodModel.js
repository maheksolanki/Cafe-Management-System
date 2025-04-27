import mongoose, { mongo } from "mongoose";

//create the schema for food propertice
const foodSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  image : {
    type : String,
    required : true
  },
  category : {
    type : String,
    required : true
  }
})

//define the model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);
// mongoose.models.food this condition is for if the model is already present then use it otherwise create new model

export default foodModel;