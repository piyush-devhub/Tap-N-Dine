import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom'


function Header() {

  const [Menu, setMenu] = useState("")
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/")

}


  return (
    <div className="Header">
      <div className="header-contents">
        <h2>Welcome in <span>TapN'Dine</span></h2>
        <p>
         "Order your favorite dishes directly from your phone and send them to the restaurant. 
         Experience hassle-free dining with seamless online ordering at Tap'Dine."
        </p>
        <a href='#explore-menu' className="menu-btn" onClick={()=>{setMenu("Menu")}}>View Menu</a>
      </div>
    </div>
  );
}

export default Header;
