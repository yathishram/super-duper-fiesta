const http = require('http');
const {pushDummyData, getTransactionsInRange, getSumOfAmounts } = require('./dbQueries');
const url = require('url');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});

const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');

  try {
    /**
     * This endpoint is used to check if the server is running.
     */
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Hello World!" }));
    } 
    /**
     * This endpoint is used to push dummy data into the database.
     */
    else if (req.method === 'GET' && req.url === '/pushDummyData') {
      const response = await pushDummyData();
      if (response) {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Dummy data inserted successfully" }));
      } else {
        throw new Error('Error inserting dummy data');
      }
    } 
    /**
     * This endpoint is used to get transactions in a given date range and amount range.
     */
    else if (req.method === 'GET' && reqUrl.pathname === '/transactions-in-range') {
      const { startDate, endDate, minAmount, maxAmount } = reqUrl.query;

      if (!startDate || !endDate || !minAmount || !maxAmount) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Missing required parameters' }));
        return;
      }

      const response = await getTransactionsInRange(startDate, endDate, minAmount, maxAmount);
      if (response) {
        res.writeHead(200);
        res.end(JSON.stringify(response));
      } else {
        throw new Error('Error getting transactions in range');
      }
    } 
    /**
     * This endpoint is used to get sum of amounts in a given date range and user id.
     */
    
    else if (req.method === 'GET' && reqUrl.pathname === '/sum-of-amounts') {
      const { startDate, endDate, userId } = reqUrl.query;

      if (!startDate || !endDate || !userId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Missing required parameters' }));
        return;
      }

      const response = await getSumOfAmounts(startDate, endDate, userId);
      if (response) {
        res.writeHead(200);
        res.end(JSON.stringify(response));
      } else {
        throw new Error('Error getting sum of amounts');
      }
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (err) {
    logger.error(err.message);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  logger.info(`Server running at port ${PORT}`);
});
