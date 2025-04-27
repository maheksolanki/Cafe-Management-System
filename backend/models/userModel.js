import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name : {
    type  : String,
    required : true,
  },
  email : {
    type  : String,
    required : true,
    unique : true,
  },
  password : {
    type  : String,
    required : true,
  },
  cartData :{
    type : Object,
    default : {},
  }
},{
  minimize : false, // to allow empty objects in cartData
});

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;

