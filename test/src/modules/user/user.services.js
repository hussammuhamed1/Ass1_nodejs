import { userModel } from "../../DB/models/user.model.js"

export const createUser = async (name,age,password,email)=>{
     const user = await userModel.create({name,age,password,email})
     
    return user
}