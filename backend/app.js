import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import { add as add, get as get } from './data/user.js';
import { createJSONToken as createJSONToken, isValidPassword as isValidPassword} from './util/auth.js';
import { isValidEmail as isValidEmail, isValidText as isValidText } from './util/validation.js';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/signup', async (req, res, next) => {
    const data = req.body;
    let errors = {};

    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email.';
    } else {
        try {
            const existingUser = await get(data.email);
            if (existingUser) {
                errors.email = 'Email exists already.';
            }
        } catch (error) { }
    }

    if (!isValidText(data.password, 6)) {
        errors.password = 'Invalid password. Must be at least 6 characters long.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
    }

    try {
        const createdUser = await add(data);
        const authToken = createJSONToken(createdUser.email);
        res
            .status(201)
            .json({ message: 'User created.', user: createdUser, token: authToken });
    } catch (error) {
        next(error);
    }
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let user;
    try {
        user = await get(email);
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed.' });
    }

    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
        return res.status(422).json({
            message: 'Invalid credentials.',
            errors: { credentials: 'Invalid email or password entered.' },
        });
    }

    const token = createJSONToken(email,user.role);
    res.json({ token });

});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items === []) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
