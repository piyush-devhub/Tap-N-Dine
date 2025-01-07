import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setshowLogin }) => {
  const { url, settoken } = useContext(StoreContext);

  const [data, setdata] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Debugging statement
    console.log("Form data: ", data);
    const newUrl = url + "/api/user/register";
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setshowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Register Yourself</h2>
          <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          <input name="name" onChange={onChangehandler} value={data.name} type="text" placeholder="Your name" required />
          <input name="mobile" onChange={onChangehandler} value={data.mobile} type="tel" placeholder="Your mobile number" required />
          <input name="email" onChange={onChangehandler} value={data.email} type="email" placeholder="Your email" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPopup;
