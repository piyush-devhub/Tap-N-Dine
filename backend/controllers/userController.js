import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Register user (name, mobile, email)
const registerUser = async (req, res) => {
    const { name, mobile, email } = req.body;

    try {
        // Check if the email already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate mobile number
        if (!validator.isMobilePhone(mobile)) {
            return res.json({ success: false, message: "Please enter a valid mobile number" });
        }

         //hashing user password
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(mobile,salt);
 
         const newUser = new userModel({
             name:name,
             email:email,
             mobile:hashedPassword
         })


        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//login user
const loginUser = async(req,res) => {
    const {email,mobile} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(mobile,user.mobile)
        if(!isMatch){
            return res.json({success:false,message:"Invalid details"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Generate JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { registerUser,loginUser };
