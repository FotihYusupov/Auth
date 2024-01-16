/* eslint-disable no-console */
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const router = require('./routes/router');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('db error', err.message));

app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.static('public'));

app.use(router);

app.get('/', (req, res) => {
  res.render('index', { title: 'Server is run' });
});

app.listen(process.env.PORT || 5000, () => console.log('server is run'));
