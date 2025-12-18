import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // ===== GET USERS =====
  if (method === "GET" && url === "/users") {
    const users = await fs.readFile("./data.json", "utf-8");
    res.setHeader("Content-Type", "application/json");
    res.end(users);
  }

  // ===== ADD USER =====
  else if (method === "POST" && url === "/users") {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });

    req.on("end", async () => {
      try {
        const newUser = JSON.parse(body);
        const usersData = await fs.readFile("./data.json", "utf-8");
        const users = JSON.parse(usersData);

        const userExists = users.some(u => u.email === newUser.email);
        if (userExists) {
          res.statusCode = 409;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "User already exists" }));
          return;
        }

        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUserWithId = { ...newUser, id: lastId + 1 };
        users.push(newUserWithId);

        await fs.writeFile("./data.json", JSON.stringify(users, null, 2));

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "User added successfully" }));

      } catch (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: err.message }));
      }
    });
  }

  // ===== PATCH USER =====
  else if (method === "PATCH" && url.startsWith("/users/")) {
    const userId = Number(url.split("/")[2]);
    let body = "";

    req.on("data", chunk => { body += chunk; });

    req.on("end", async () => {
      try {
        if (!body) throw new Error("No update data provided");
        const updatedData = JSON.parse(body);

        const usersData = await fs.readFile("./data.json", "utf-8");
        const users = JSON.parse(usersData);

        const userExists = users.some(u => u.id === userId);
        if (!userExists) {
          res.end(JSON.stringify({ message: "User not found" }));
          return;
        }

        const updatedUsers = users.map(u => 
          u.id === userId 
            ? { ...u, ...updatedData, id: u.id } 
            : u
        );

        await fs.writeFile("./data.json", JSON.stringify(updatedUsers, null, 2));
        res.end(JSON.stringify({ message: "User updated successfully" }));

      } catch (err) {
        res.end(JSON.stringify({ message: err.message }));
      }
    });
  }

  // ===== DELETE USER =====
  else if (method === "DELETE" && url.startsWith("/users/")) {
    const userId = Number(url.split("/")[2]);
    try {
      const usersData = await fs.readFile("./data.json", "utf-8");
      const users = JSON.parse(usersData);

      const userExists = users.some(u => u.id === userId);
      if (!userExists) {
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      const updatedUsers = users.filter(u => u.id !== userId);
      await fs.writeFile("./data.json", JSON.stringify(updatedUsers, null, 2));

      res.end(JSON.stringify({ message: "User deleted successfully" }));

    } catch (err) {
      res.end(JSON.stringify({ message: err.message }));
    }
  }

  // ==== Get User by ID =====
  else if (method === "GET" && url.startsWith("/users/")) {
    const userId = Number(url.split("/")[2]);
    try {
      const usersData = await fs.readFile("./data.json", "utf-8");
      const users = JSON.parse(usersData);          
      const user = users.find(u => u.id === userId);
      if (!user) {
        res.end(JSON.stringify({ message: "User not found" })); 
        return;
      }
      res.end(JSON.stringify(user));
    } catch (err) {
      res.end(JSON.stringify({ message: err.message }));
    }
  }

  // ===== NOT FOUND =====
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
