const db = require("../db/dbConfig");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getOneUser = async (id) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE id=$1", [id]);
    return user;
  } catch (error) {
    return error;
  }
};

const createUser = async (user) => {
  const { first_name, middle_name, last_name, engagement } = user;
  try {
    const newUser = await db.one(
      "INSERT INTO users (first_name, middle_name, last_name, engagement) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, middle_name, last_name, engagement]
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async (id, user) => {
  const { first_name, middle_name, last_name, engagement } = user;
  try {
    const updatedUser = await db.one(
      `UPDATE users SET first_name=$1, middle_name=$2, last_name=$3, engagement=$4 WHERE id=$5 RETURNING *`,
      [first_name, middle_name, last_name, engagement, id]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
