import userModel from "../models/userModel.js";


//add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        let user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Increment the item count or set to 1 if it doesn't exist
        const currentQuantity = user.cartData.get(itemId) || 0;
        user.cartData.set(itemId, currentQuantity + 1);

        // Save the updated user document
        await user.save();

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//remove items from user cart
// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        let user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get current quantity and decrement if greater than 0
        const currentQuantity = user.cartData.get(itemId) || 0;
        if (currentQuantity > 0) {
            user.cartData.set(itemId, currentQuantity - 1);
            
            // If quantity becomes 0, remove the item from the cart
            if (currentQuantity - 1 === 0) {
                user.cartData.delete(itemId);
            }
        }

        // Save the updated user document
        await user.save();

        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing userId" });
        }

        let user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Convert Map to a plain object for JSON serialization
        const cartData = Object.fromEntries(user.cartData);

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export {addToCart,removeFromCart,getCart}