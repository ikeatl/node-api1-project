// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ message: "Please provide name and bio for the user" });
  }
  try {
    const newUser = await User.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "There was an error while saving the user to the database" });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }
    res.status(200).json(user); // Respond with user
  } catch (error) {
    res.status(500).json({ message: "The user information could not be retrieved" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.remove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({ message: "Please provide name and bio for the user" });
  }
  try {
    const user = await User.update(req.params.id, { name, bio });
    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "The user information could not be modified" });
  }
});

module.exports = server;
