# Backend
The backend repository which contian all services in single project. 

## Prerequisites
1. Install [PM2](http://pm2.keymetrics.io/) globally. `npm install pm2 -g`
2. Node version required: `^12.0.0`


## Dependencies
* node
* express
* assert
* body-parser
* chai-http
* dotenv
* mysql2
* request
* supertest
* chai
* mocha
* ts-node
* typescript
* @types/body-parser
* @types/chai
* @types/dotenv
* @types/express
* @types/mocha
* @types/mysql
* @types/node
* @types/assert
* @types/chai-http
* @types/request
* @types/supertest


## Getting Started
1. Clone this repository.
2. Run `npm install`
3. Create your feature branch and start working on it.
4. Add `.env` file.
5. To start Development environment use `tsc && node dist/app.js`

Update the .env details locally
<h2>.env.sample</h2>

PORT=""
DB_HOST=""
DB_USER=""
DB_PWD=""
DB_NAME="" 

## Application Structure

- `app.ts` - The entry point to our application. This file defines our express server and connects it to MySQL. It also requires the routes and models we'll be using in the application.
- `db.ts` - This file contains configuration to connect our application with database.
- `routes/` - This folder contains the route definitions for our API.
- `types/` - This folder contains the type definitions for our mysql schema models.
- `models/` - This folder contains the controllers which are linked by API .
- `test/` - This folder contains all the test cases for testing the applcaition API.