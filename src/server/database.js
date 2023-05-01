// database.js

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "pass",
  database: "my-fit-app",
});

client.connect();

async function getUsers() {
  const res = await client.query('SELECT * FROM "User"');
  return res.rows;
}

async function getUserByEmailAndPassword(email, password) {
  const query = `SELECT * FROM User2 WHERE "email" = $1 AND "password" = $2`;
  const values = [email, password];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function addNewUser(email, password, name, user_type) {
  const query = `INSERT INTO User2 (email, password, name, user_type,registration_date) VALUES ($1, $2, $3, $4,current_timestamp)`;
  const values = [email, password, name, user_type];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function getUserById(id) {
  const query = "SELECT * FROM User2 WHERE user_id = $1";
  const values = [id];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function getCardByUserId(id) {
  const query =
    "SELECT credit_card_ids,validation_status FROM UserType WHERE user_id = $1";
  const values = [id];
  const res = await client.query(query, values);
  return res.rows;
}

async function updateUserById(userId, name, email, user_type) {
  const query =
    "UPDATE User2 SET name = $1, email = $2, user_type = $3 WHERE user_id = $4";
  const values = [name, email, user_type, userId];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function updateCardStatus(formData) {
  console.log(formData)
  if (!formData || !Array.isArray(formData)) {
    throw new Error("formData is not an array");
  }
  await Promise.all(formData.map(async (c) => {
    const query = `UPDATE UserType SET validation_status = $2 WHERE credit_card_ids = $1`;
    const values = [c.credit_card_ids, c.validation_status];
    await client.query(query, values);
  }));
  return formData;
}


async function addCustomerTrack(formData, total_calories) {
  const userId = formData.user_id;
  const date = formData.date;
  const steps = formData.steps;
  const query = `INSERT INTO Customers (customer_id, date, total_calories, total_steps) VALUES ($1, $2, $3, $4) ON CONFLICT (customer_id, date) DO UPDATE SET total_calories = $3, total_steps = $4`;
  const values = [userId, date, Math.round(total_calories), steps];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function insertCard(formData) {
  const userId = formData.user_id;
  const date = formData.date;
  const steps = formData.steps;
  const query = `INSERT INTO customers (customer_id, date, total_calories, total_steps) VALUES ($1, $2, $3, $4) ON CONFLICT (customer_id, date) DO UPDATE SET total_calories = $3, total_steps = $4`;
  const values = [userId, date, Math.round(total_calories), steps];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function insertCard(formData) {
  const creditCardId = formData.credit_card_id;
  const dateAdded = formData.date_added;
  const cvv = formData.cvv;
  const type = formData.type;
  const expirationDate = formData.expiration_date;
  const query = `INSERT INTO Card_Info (credit_card_id, date_added, cvv, type, expiration_date) VALUES ($1, $2, $3, $4, $5)`;
  const values = [creditCardId, dateAdded, cvv, type, expirationDate];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function updateUserType(formData) {
  //todo: mockId for customer/personal
  const mockId = 100;
  const credit_card_id = formData.credit_card_id;
  const user_id = formData.user_id;
  const personal_id = mockId;
  const customer_id = mockId;
  const query = `INSERT INTO UserType (user_id, credit_card_ids,personal_trainer_ids, customers_ids) VALUES ($1, $2, $3, $4)`;
  const values = [user_id, credit_card_id, personal_id, customer_id];
  const res = await client.query(query, values);
  return res.rows[0];
}

async function retrieveChartByCustomerId(userId){
  const query = `SELECT * FROM customers where customer_id = $1`;
  const values = [userId];
  const res = await client.query(query, values);
  return res.rows;
}


async function getPasswordByEmail(formData){
  console.log(getPasswordByEmail)
  const query = `SELECT password FROM User2 where email = $1 and user_type = $2`;
  const values= [formData.email,formData.user_type];
  const res = await client.query(query,values);
  return res.rows[0];
}

module.exports = {
  getUsers,
  getUserByEmailAndPassword,
  addNewUser,
  getUserById,
  getCardByUserId,
  updateUserById,
  addCustomerTrack,
  insertCard,
  updateUserType,
  updateCardStatus,
  retrieveChartByCustomerId,
  getPasswordByEmail
};
