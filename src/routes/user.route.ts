import { Router } from "express";
import { userService } from "../service/user.service";

const userRouter = Router();

// Path: /api/v1/users

userRouter.post("/", async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // Insert a new user into the database
    const newUser = await userService.createUser({ name, age, email });

    return void res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message === "User with this email already exists"
    ) {
      return void res.status(400).json({ error: error.message });
    }
    return void res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    // Get all users from the database
    const users = await userService.getUsers();

    return void res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
