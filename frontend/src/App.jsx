import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import MyOrders from './pages/Myorders/MyOrders';

function App() {
  const [showLogin, setshowLogin] = useState(false);

  useEffect(() => {
    const userDataCollected = localStorage.getItem('userDataCollected');

    if (!userDataCollected) {
      setshowLogin(true); 
    }
  }, []);

  const handleUserRegistration = () => {
    localStorage.setItem('userDataCollected', 'true'); 
    setshowLogin(false); 
  };

  return (
    <>
      {showLogin ? (
        <LoginPopup setshowLogin={setshowLogin} onRegister={handleUserRegistration} />
      ) : null}
      <div className="App">
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
