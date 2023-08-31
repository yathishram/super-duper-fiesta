const { Client } = require("pg");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const dbClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: true,
});

dbClient.connect();


/**
 *  This function is used to push dummy data into the database.
 * @returns {Promise<boolean>}
 */
const pushDummyData = async () => {
  try {
    const dummyData = [
      {
        user_id: "68b5395c-fccc-415f-b968-af897fd66bd1",
        amount: 35000.0,
        txn_date: "2023-01-01T10:00:00Z",
      },
      {
        user_id: "68b5395c-fccc-415f-b968-af897fd66bd1",
        amount: 1000.0,
        txn_date: "2023-01-02T10:00:00Z",
      },
      {
        user_id: "68b5395c-fccc-415f-b968-af897fd66bd1",
        amount: 5000.0,
        txn_date: "2023-02-01T10:00:00Z",
      },
      {
        user_id: "68b5395c-fccc-415f-b968-af897fd66bd1",
        amount: 35.0,
        txn_date: "2023-02-02T10:00:00Z",
      },
      { user_id: uuidv4(), amount: 3500.0, txn_date: "2023-05-01T10:00:00Z" },
      { user_id: uuidv4(), amount: 11000.0, txn_date: "2023-03-01T10:00:00Z" },
      { user_id: uuidv4(), amount: 12000.0, txn_date: "2023-04-01T10:00:00Z" },
    ];

    for (const data of dummyData) {
      await dbClient.query(
        `Insert into transactions (user_id, amount, txn_date) VALUES ($1, $2, $3)`,
        [data.user_id, data.amount, data.txn_date]
      );
    }

    console.log("Dummy data inserted successfully");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 *  This function is used to get transactions in a given date range and amount range.
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} minAmount 
 * @param {*} maxAmount 
 * @returns  {Promise<array>}
 */
const getTransactionsInRange = async (
  startDate,
  endDate,
  minAmount,
  maxAmount
) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const response = await dbClient.query(
      `Select * from transactions where txn_date between $1 and $2 and amount between $3 and $4`,
      [formattedStartDate, formattedEndDate, minAmount, maxAmount]
    );
    return response.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 *  This function is used to get sum of amounts in a given date range and user id.
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} userId 
 * @returns  {Promise<object>}
 */
const getSumOfAmounts = async (startDate, endDate, userId) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const response = await dbClient.query(
      `Select sum(amount) from transactions where txn_date between $1 and $2 and user_id = $3`,
      [formattedStartDate, formattedEndDate, userId]
    );
    return response.rows[0];
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 *  This function is used to format date.
 * @param {*} date 
 * @returns  {Date}
 */
const formatDate = (date) => {
  const [day, month, year] = date.split("-");

  return new Date(year, month - 1, day);
};

module.exports = {
  dbClient,
  pushDummyData,
  getTransactionsInRange,
  getSumOfAmounts,
};
