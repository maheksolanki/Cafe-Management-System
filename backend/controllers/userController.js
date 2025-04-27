import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; // use for authentication
import bcrypt from "bcrypt";
import validator from "validator"; // use for validation

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking user is awailable or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    //if user exist then we check the password is correct or not

    const isMatch = await bcrypt.compare(password, user.password); // compare the password(currently entered password) with user.password (hashed or stored password in db).

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token }); // if user is found then we send the token to the frontend
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // jwt => javascript web token
};

//api to register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email fromat & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Srong password with at least 8 characters",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10); //A salt is a random string added to the password before hashing.
    const hashedPassword = await bcrypt.hash(password, salt); // The hash function combines the password and the salt, then processes it through a hashing algorithm.

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //saving user to database
    const user = await newUser.save();

    const token = createToken(user._id); // create token for user
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
