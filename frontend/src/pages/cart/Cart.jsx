import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  
  const { food_list, CartItem, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Note</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (CartItem[item._id]?.quantity > 0) {
            const { quantity, note } = CartItem[item._id];
            return (
              <div>
                <div key={item._id} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt={item.name}  />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{quantity}</p>
                <p>{note || "No note added"}</p>
                <p>₹{calculateTotalPrice(item.price, quantity)}</p>
                <p onClick={()=>removeFromCart(item._id)} className="cross">x</p>
              </div>
              <hr />
              </div>
            );
          }
          return null; // If quantity is 0 or item is not in the cart, don't render anything
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type=" " placeholder="Promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()}</b>
            </div>
            <hr />
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;