const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../queries/users");

users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "Server Error, Can't Find Users" });
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getOneUser(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
users.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deletedUser);
  } else {
    res.status(400).json("Event not found");
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  res.status(200).json(updatedEvent);
});

module.exports = users;
