import React, { useState,useEffect, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContex";
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name : "",
    email : "",
    password : ""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data , [name] : value}));
  }

  const onLogin =async(event) =>{
    event.preventDefault();
    let newUrl = url;
    if(currState === 'Login'){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }

    //this is run the our api
    const response = await axios.post(newUrl , data);

    //if this condition is true then return one token that return by out backend api
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token" , response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }

  }
  //this useEffect use for hide all other pages when signin or login page open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll
    return () => {
      document.body.style.overflow = "auto"; // restore scroll when popup unmounts
    };
  }, []);


  return (
    <div className="login-popup">
      <form onSubmit= {onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name = 'name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
