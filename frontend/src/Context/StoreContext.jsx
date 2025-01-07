import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [CartItem, setCartItem] = useState({});
  const url = "http://localhost:4000";
  const [token, settoken] = useState("");
  const [food_list, setfood_list] = useState([]);

  const addToCart = async (itemId) => {
    setCartItem((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: { quantity: 1, note: "" } };
      } else {
        return {
          ...prev,
          [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity + 1 },
        };
      }
    });
  
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        console.log("Item added to cart successfully");
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };
  

  const removeFromCart = async (itemId) => {
    // Update the cart state first
    setCartItem((prev) => {
      if (prev[itemId]?.quantity === 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];  // Remove item if its quantity is 1
        return updatedCart;
      } else {
        return {
          ...prev,
          [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity - 1 }, 
        };
      }
    });
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        console.log("Item removed from cart successfully");
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };
  

  const addNoteToItem = (itemId, note) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], note: note },
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in CartItem) {
      if (CartItem[item]?.quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * CartItem[item].quantity;
        }
      }
    }
    return totalAmount.toFixed(2); 
  };

  const Fetchfood_list = async () => {
    const response = await axios.get(url+"/api/food/list");
    setfood_list(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await Fetchfood_list();
    }
    loadData();
  }, []);

  const ContextValue = {
    food_list,
    CartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    addNoteToItem,
    getTotalCartAmount,
    url,
    token,
    settoken,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
