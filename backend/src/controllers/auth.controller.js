import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { generateAccessToken } from '../services/jwt.js';

export const registerAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const existingAdmin=await Admin.findOne({email});
        if(existingAdmin){
            return  res.status(400).json({message:"Admin already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin=await Admin.create({email,password:hashedPassword});

        res.status(201).json({message:"Admin registered successfully",admin:newAdmin._id});
    }
    catch(error){
        console.error("Error in registerAdmin:",error);
        res.status(500).json({message:"Error registering admin"});
    }
}


export const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const admin=await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        const isPasswordValid=await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=generateAccessToken(admin);
        res.cookie("accessToken",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:24*60*60*1000
        });

        res.json({
            message:"Login successful",
            token
        })
    } catch (error) {
        console.error("Error in loginAdmin:",error);
        res.status(500).json({message:"Error logging in admin"});
    }
}