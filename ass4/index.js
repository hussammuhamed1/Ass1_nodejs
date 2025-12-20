import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET all users
app.get("/user", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));
  res.json(users);
});

// POST new user
app.post("/user", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));

  const lastId = users.length > 0 ? users[users.length - 1].id : 0;

  const newUser = {
    id: lastId + 1,
    ...req.body
  };

  users.push(newUser);

  await fs.writeFile("./data.json", JSON.stringify(users, null, 2));

  res.json({
    message: "User added successfully",
    user: newUser
  });
});

// PATCH update user
app.patch("/user/:id", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));

  const userId = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const { id, ...updates } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };

  await fs.writeFile("./data.json", JSON.stringify(users, null, 2));

  res.json({
    message: "User updated successfully",
    user: users[userIndex]
  });
});

// DELETE user
app.delete("/user{/:id}", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));

  const userId = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1);

  await fs.writeFile("./data.json", JSON.stringify(users, null, 2));  
  

  
  res.json({
    message: "User deleted successfully",
    user: users
  });
});
// GET user by name
app.get("/user/getByName", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));
  const nameQuery = req.query.name; 
  const filteredUsers = users.filter(user => user.name === nameQuery);
  res.json(filteredUsers);

})
// GET filter minAge
app.get("/user/filter", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));
  const minAge = req.query.minAge; 
  const filteredUsers = users.filter(user => user.age >minAge);
  res.json(filteredUsers);

})
// GET user by id
app.get("/user/:id", async (req, res) => {
  const users = JSON.parse(await fs.readFile("./data.json", "utf-8"));
  const userId = Number(req.params.id);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
