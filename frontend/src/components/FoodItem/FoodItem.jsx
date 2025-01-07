import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image,prepTime }) => {
  const { CartItem, addToCart, removeFromCart, addNoteToItem, url } = useContext(StoreContext);
  

  const [note, setNote] = useState(CartItem[id]?.note || ""); 
  const [noteAdded, setNoteAdded] = useState(false);

 
  const handleNoteChange = (event) => {
    setNote(event.target.value); 
    setNoteAdded(false);
  };


  const handleSaveNote = () => {
    if (note.trim()) {
      addNoteToItem(id, note);
      setNote(""); 
      setNoteAdded(true); 
      console.log(`Note for item ${id}:`, note); 
    } else {
      alert("Please enter a valid note!"); 
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url+"/images/"+image} alt={name} />
        {!CartItem[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
           
            <p>{CartItem[id]?.quantity}</p> 
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>


        <input
          className="input-field"
          type="text"
          placeholder="Add Note:"
          value={note}
          onChange={handleNoteChange} 
        />
        <button className="input-field-button" onClick={handleSaveNote}>
          {noteAdded ? "Note Added..." : "Add Note"} 
        </button>
        
        <p className="food-item-price">₹ {price}</p>
        <p className="food-item-prep-time"><strong>Prep Time:</strong> {prepTime ? `${prepTime} minutes` : "N/A"} </p>
      </div>
    </div>
  );
};

export default FoodItem;
