const db = require("../db/dbConfig");

const getAllCheckouts = async () => {
  try {
    const allCheckouts = await db.any("SELECT * FROM checkout");
    return allCheckouts;
  } catch (error) {
    return error;
  }
};

const getOneCheckout = async (user_id, book_id) => {
  try {
    const checkout = await db.oneOrNone(
      "SELECT * FROM checkout WHERE user_id=$1 AND book_id=$2",
      [user_id, book_id]
    );
    return checkout;
  } catch (error) {
    return error;
  }
};

const createCheckout = async (user_id, book_id) => {
  try {
    const newCheckout = await db.one(
      "INSERT INTO checkout (user_id, book_id, checkout_time, return_time, checked_out) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, book_id, new Date(), NULL, true]
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

const deleteCheckout = async (user_id, book_id) => {
  try {
    const deletedCheckout = await db.one(
      "DELETE FROM checkout WHERE user_id=$1 AND book_id=$2 RETURNING *",
      [user_id, book_id]
    );
    return deletedCheckout;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCheckouts,
  getOneCheckout,
  createCheckout,
  deleteCheckout,
};
