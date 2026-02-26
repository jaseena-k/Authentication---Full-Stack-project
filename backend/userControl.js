import UserDetails from './user.model.js'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// const bcrypt = require('bcrypt');
const SECRET_KEY = "mysecret123"

export const getDetails = async (req, res) => {
    try {
        const user = await UserDetails.find({})
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createDetails = async (req, res) => {
    try {
        //password encryption
        const { username, password, email } = req.body
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed password:", hashedPassword)

        const user = await UserDetails.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }

}
export const updateDetails = async (req, res) => {
    try {

        const { id } = req.params
        const user = await UserDetails.findByIdAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: "user not found" })
            console.log(user);
        }
        const updateUserDetails = await UserDet.findById(id)
        res.status(200).json(updateUserDetails)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteDelails = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserDetails.findByIdAndDelete(id)

        if (!user) {
            res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({ message: "successfully deleted" })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const postLoginDetails = async (req, res) => {
    try {
        const { password, username } = req.body
        console.log('password :: ',password);
        
        const user = await UserDetails.findOne({ username })
        if (!user) {
            res.status(404).json({ message: "username not found" })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch",isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: "login status invalid" });
        }

        //create JWT token
        const token = jwt.sign(
            { user },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ token })
        res.status(200).json({ message: "Login successfuly", user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }



}

//middleware
export  function verifyToken(req,res,next){
    const token = req.headers.authorization
    console.log(token,"token");
    

    try{
    if(!token){
        return res.status(401).json({message:"token not provided"})
    }

        const verify =jwt.verify(token,SECRET_KEY)
        req.user = verify
        next()
    }
    catch(error){
       res.status(500).json({message:error.message})
    }


}



