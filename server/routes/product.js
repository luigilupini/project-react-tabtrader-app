import express from 'express';
// This line imports the model from your models directory. This model is
// used to interact with the collection in your MongoDB database.
import Product from '../models/Product.js';

// This line creates a new router object. In Express.js, a router is a
// middleware that allows you to group your route handlers and middleware in a
// modular, mountable way. Helps reason about and manage as it grows.
const router = express.Router();

// This line defines a route handler for GET requests to the endpoint. When a
// client sends a GET request to this endpoint, the function you've defined here
// will be executed. This line uses a model to query your db for all documents
// in the collection. The find() returns a promise, so you use the await keyword
// to pause execution of your function until the promise is resolved.
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    // If the database query is successful, this line sends a response to the
    // client with a status code of 200 (which means "OK") and a body containing
    // all the docs retrieved from the database, in JSON format.
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
