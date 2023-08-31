const request = require('supertest');
const http = require('http');
const { dbClient,pushDummyData, getTransactionsInRange, getSumOfAmounts } = require('./dbQueries');
const url = require('url');

describe('Test the server endpoints', () => {
    let server;

    beforeAll(() => {
        server = http.createServer(async (req, res) => {
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
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          });
        server.listen(5001);
    });

    afterAll((done) => {
        server.close(() => {
          dbClient.end();
        done();
        });
    });

    test('health check', async () => {
        const response = await request(server).get('/health');
        expect(response.statusCode).toBe(200);
    }, 10000);


    test('get transactions in range', async () => {
        const response = await request(server)
            .get('/transactions-in-range')
            .query({
                startDate: '01-01-2023',
                endDate: '31-01-2023',
                minAmount: 1000,
                maxAmount: 50000
            });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }, 10000);

    test('get sum of amounts', async () => {
        const response = await request(server)
            .get('/sum-of-amounts')
            .query({
                startDate: '01-01-2023',
                endDate: '31-01-2023',
                userId: '68b5395c-fccc-415f-b968-af897fd66bd1'
            });
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
    }, 10000);
});
