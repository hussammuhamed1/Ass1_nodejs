import userModel from "../../db/models/user.model.js"

import bcrypt from "bcrypt"
export const signUp = async (userName ,password , email , age , gender)=>{
    const isEmailExist = await userModel.findOne({email: email})
    if(isEmailExist){
        throw new Error("Email already exists")

    }
    const PasswordCrypt = await bcrypt.hash(password, 10)
    const newUser =await userModel.create({
        userName,
        password: PasswordCrypt,
        email,
        age,    
        gender
    })  
    return {data : newUser}
}

export const logIn = async (email , password)=>{
    const user = await userModel.findOne({email: email})
    if(!user){
        throw new Error("Invalid email or password")
    }
        const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid email or password")
    }
    return user;
}