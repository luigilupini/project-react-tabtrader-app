/* IMPORTING PACKAGES  */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

/* IMPORTING MODELS */
import KPI from './models/KPI.js';
import Product from './models/Product.js';
import Transaction from './models/Transaction.js';

/* IMPORTING ROUTES */
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';

/* IMPORTING DATA  */
import { kpis, products, transactions } from './data/data.js';

/* CONFIGURATIONS */
// This line of code is used to load environment variables from a .env file into
// process.env. This is useful for hiding sensitive information such as database
// connection strings, API keys, and other credentials.
dotenv.config();
// Here an instance of the Express application is being created and assigned to
// the variable app. This instance has methods for routing HTTP requests,
// configuring middleware, rendering HTML views, registering a template engine,
// and modifying application settings that control how the application behaves
// (e.g., the environment mode, whether route definitions are case sensitive,
// and the location of the views and static files directories).
const app = express();

// This line of code is using the express.json() middleware. This middleware is
// a built-in middleware function in Express. It parses incoming requests with
// JSON payloads and is based on body-parser. It helps to parse the JSON data
// that's part of the request object.
app.use(express.json());

// Helmet is a collection of middleware functions that set security-related HTTP
// response headers to help protect your app from known web vulnerabilities. By
// default, Helmet includes 11 middleware functions, but not all are enabled.
// You can also enable or disable specific middleware functions or use them
// individually instead of calling helmet(). The next line sets a Cross-Origin
// Resource Policy header. This header mitigates cross-origin information leaks.
// It is similar to the Same-Origin Policy, but it allows you to opt into
// leaking information cross-origin.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Morgan is a middleware function that logs HTTP requests. The 'common'
// argument means that it will log in the Apache common log format.
app.use(morgan('common'));

// This is middleware that parses incoming request bodies in a middleware before
// your handlers, available under req.body property. It's based on body-parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Allows express to parse urlencoded bodies
app.use(cors()); // Adds CORS as a middleware

/* ROUTES */
// This line of code is using the Express Router to handle all requests at the
// below paths. The router allows you to define route handlers for specific
// paths in a modular way. When you use a router, the paths you define on it are
// relative to the path where you mount the router in your main server file.
// Example `/kpi` endpoint the full path to trigger a callback is `/kpi/kpis`.
app.use('/kpi', kpiRoutes); // 👈🏻 mounting /kpis
app.use('/product', productRoutes); // 👈🏻 mounting /products
app.use('/transaction', transactionRoutes); // 👈🏻 mounting /transactions

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; // Setting up the port
// This line of code is connecting to a MongoDB database using Mongoose. The
// MONGO_URL is the URL of your MongoDB database. The other options to deal with
// MongoDB driver deprecation warnings.
mongoose
  .connect(process.env.MONGO_URL, {
    // Connecting to MongoDB using Mongoose
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // This line of code is starting the server and making it listen for requests on the specified port.
  .then(async () => {
    app.listen(PORT, () => console.log(`Express Server Port: ${PORT}`)); // Starting the server

    // ! ADD DATA ONE TIME ONLY OR AS NEEDED HERE
    /*
    // 1) Drops current database before we seed it 🌱 (avoid duplicates)
    await mongoose.connection.db.dropDatabase();
    // 2) Inserts data into database following the schema model/structure 🏗️
    KPI.insertMany(kpis);
    Product.insertMany(products);
    Transaction.insertMany(transactions);
    console.log('Database seeded 🌱 successfully');
    */
  })
  .catch((error) => console.log(`${error} did not connect`)); // Logs any connection errors
