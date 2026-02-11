import { Router } from "express";
import { createUser } from "./user.services.js";


export const router  = Router()


router.post( "/signUp", async (req,res)=>{
    const {name,age,password,email} = req.body
    const data = await createUser(name,age,password,email)
    res.status(200).json(data)
})