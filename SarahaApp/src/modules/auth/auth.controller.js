import { Router } from "express";
import { logIn, signUp } from "./auth.service.js";

export const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res) => {
  const { userName, password, email, age, gender } = req.body;
  try {
    const data = await signUp(userName, password, email, age, gender);
    res.status(201).json({ message: "User created successfully", data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await logIn(email, password);
    res
      .status(200)
      .json({ message: "User logged in successfully", data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
