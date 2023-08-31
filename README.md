# Transaction API

This project includes a simple API for interacting with transactions in a database. It includes endpoints for pushing dummy data into the database, getting transactions in a given date and amount range, and getting the sum of amounts in a given date range for a specific user.

## Installation

Install the required packages:

    npm install

Start the server:

    npm start

Run Tests:

    npm test

## API Endpoints

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Check if the server is running.
- **Response**: A JSON object with a message "Hello World!".

**Example Request**:

GET /health

**Example Response**:

{ "message": "Hello World!" }

### Push Dummy Data

- **URL**: `/pushDummyData`
- **Method**: `GET`
- **Description**: Insert dummy data into the database.
- **Response**: A JSON object with a message indicating the success or failure of the operation.

**Example Request**:

GET /pushDummyData

**Example Response**:

{ "message": "Dummy data inserted successfully" }

### Get Transactions in Range

- **URL**: `/transactions-in-range`
- **Method**: `GET`
- **Query Parameters**:
  - `startDate`: Start date in the format `DD-MM-YYYY`.
  - `endDate`: End date in the format `DD-MM-YYYY`.
  - `minAmount`: Minimum amount.
  - `maxAmount`: Maximum amount.
- **Description**: Get transactions in a given date range and amount range.
- **Response**: A JSON array of transactions.

**Example Request**:

GET /transactions-in-range?startDate=01-01-2023&endDate=31-01-2023&minAmount=1000&maxAmount=50000

**Example Response**:

[
    {
        "txn_id": 1,
        "user_id": "68b5395c-fccc-415f-b968-af897fd66bd1",
        "amount": "35000.00",
        "txn_date": "2023-01-01T04:30:00.000Z"
    },
    {
        "txn_id": 2,
        "user_id": "68b5395c-fccc-415f-b968-af897fd66bd1",
        "amount": "1000.00",
        "txn_date": "2023-01-02T04:30:00.000Z"
    },
    {
        "txn_id": 3,
        "user_id": "68b5395c-fccc-415f-b968-af897fd66bd1",
        "amount": "5000.00",
        "txn_date": "2023-02-01T04:30:00.000Z"
    }
]

### Get Sum of Amounts

- **URL**: `/sum-of-amounts`
- **Method**: `GET`
- **Query Parameters**:
  - `startDate`: Start date in the format `DD-MM-YYYY`.
  - `endDate`: End date in the format `DD-MM-YYYY`.
  - `userId`: User ID.
- **Description**: Get the sum of amounts in a given date range for a specific user.
- **Response**: A JSON object with the sum of amounts.

**Example Request**:

Sure, here is the raw markdown for the README:

markdownCopy code

`# Transaction API

This project includes a simple API for interacting with transactions in a database. It includes endpoints for pushing dummy data into the database, getting transactions in a given date and amount range, and getting the sum of amounts in a given date range for a specific user.

## Installation

First, clone the repository to your local machine:`

git clone <repository-url>

mathematicaCopy code

 `Install the required packages:`

npm install

sqlCopy code

 `Start the server:`

npm start

markdownCopy code

 ``## API Endpoints

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Check if the server is running.
- **Response**: A JSON object with a message "Hello World!".

**Example Request**:``

GET /health

markdownCopy code

 `**Example Response**:`

{ "message": "Hello World!" }

markdownCopy code

 ``### Push Dummy Data

- **URL**: `/pushDummyData`
- **Method**: `GET`
- **Description**: Insert dummy data into the database.
- **Response**: A JSON object with a message indicating the success or failure of the operation.

**Example Request**:``

GET /pushDummyData

markdownCopy code

 `**Example Response**:`

{ "message": "Dummy data inserted successfully" }

markdownCopy code

 ``### Get Transactions in Range

- **URL**: `/transactions-in-range`
- **Method**: `GET`
- **Query Parameters**:
- `startDate`: Start date in the format `DD-MM-YYYY`.
- `endDate`: End date in the format `DD-MM-YYYY`.
- `minAmount`: Minimum amount.
- `maxAmount`: Maximum amount.
- **Description**: Get transactions in a given date range and amount range.
- **Response**: A JSON array of transactions.

**Example Request**:``

GET /transactions-in-range?startDate=01-01-2023&endDate=31-01-2023&minAmount=1000&maxAmount=50000

markdownCopy code

 `**Example Response**:`

[ { "user_id": "68b5395c-fccc-415f-b968-af897fd66bd1", "amount": 35000, "txn_date": "2023-01-01T10:00:00Z" }, ... ]

markdownCopy code

 ``### Get Sum of Amounts

- **URL**: `/sum-of-amounts`
- **Method**: `GET`
- **Query Parameters**:
- `startDate`: Start date in the format `DD-MM-YYYY`.
- `endDate`: End date in the format `DD-MM-YYYY`.
- `userId`: User ID.
- **Description**: Get the sum of amounts in a given date range for a specific user.
- **Response**: A JSON object with the sum of amounts.

**Example Request**:``

GET /sum-of-amounts?startDate=01-01-2023&endDate=31-01-2023&userId=68b5395c-fccc-415f-b968-af897fd66bd1

 **Example Response**:
{
    "sum": "41035.00"
}

## Environment Variables

The application uses the following environment variables:

- `DB_USER`: Database user.
- `DB_HOST`: Database host.
- `DB_PASSWORD`: Database password.
- `DB_DATABASE`: Database name.
- `DB_PORT`: Database port.
- `PORT`: SERVER PORT
