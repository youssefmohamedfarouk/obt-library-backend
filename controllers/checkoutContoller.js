const express = require("express");
const checkouts = express.Router();
const {
  getAllCheckouts,
  getOneCheckout,
  createCheckout,
  deleteCheckout,
  updateCheckout,
} = require("../queries/checkout");

checkouts.get("/", async (req, res) => {
  const allCheckouts = await getAllCheckouts();
  if (allCheckouts) {
    res.status(200).json(allCheckouts);
  } else {
    res.status(500).json({ error: "Server Error, Can't Find Checkouts" });
  }
});

// SHOW
checkouts.get("/:user_id/:book_id", async (req, res) => {
  const { user_id, book_id } = req.params;
  const checkout = await getOneCheckout(user_id, book_id);
  if (checkout) {
    res.status(200).json(checkout);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
checkouts.post("/:user_id/:book_id", async (req, res) => {
  try {
    const checkout = await createCheckout(req.body);
    res.status(200).json(checkout);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DELETE
checkouts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCheckout = await deleteCheckout(id);
  if (deletedCheckout.id) {
    res.status(200).json(deletedCheckout);
  } else {
    res.status(400).json("Event not found");
  }
});

// UPDATE
checkouts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCheckout = await updateCheckout(id, req.body);
  res.status(200).json(updatedEvent);
});

module.exports = checkouts;
