import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing user order from frontend
const placeOrder = async(req,res) => {
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            table:req.body.table
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    } catch (error) {
        
    }
}


//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const order = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
        
    }
}

export {placeOrder,userOrders,listOrders}