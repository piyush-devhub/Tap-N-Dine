import React, { useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

function Navbar({setshowLogin}) {

    const [Menu, setMenu] = useState("")
    const {getTotalCartAmount,token,settoken} = useContext(StoreContext)
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        navigate("/")

    }

  return (
    <div className="Navbar">
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="Navbar-Menu">
            <Link to='/' onClick={()=>{setMenu("Home")}} className={Menu==="Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>{setMenu("Menu")}} className={Menu==="Menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={()=>{setMenu("Contact")}} className={Menu==="Contact"?"active":""}>Contact us</a>
        </ul>
        <div className="Navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="Navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setshowLogin(true)}>Register</button>
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
                </div>}
            
        </div>
    </div>
  )
}

export default Navbar