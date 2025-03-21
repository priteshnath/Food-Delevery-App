import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// LOGIN USER 
const loginUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success : flase, message : 'USer Already Exist'})
        }
    } catch (error) {
        
    }
}

//REGISTER USER
const registerUser = async (req, res) => {

}

export {loginUser, registerUser};