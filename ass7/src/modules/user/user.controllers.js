import { Router } from "express";

import { getUserExcludingRole, signUpUser, updateById } from "./user.services.js";
import { getUserByEmail } from "./user.services.js";

const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await signUpUser(name, email, password, role);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const updatedUser = await updateById(id, name, email, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


userRouter.get("/by-email", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email query is required" });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "no user found", error: error.message });
    }
});
userRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;      
        const user = await getUserExcludingRole(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "no user found", error: error.message });
    }


});
export default userRouter;
