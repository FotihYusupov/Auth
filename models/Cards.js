const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
  card_id: {
    type: String,
  },
  card_number: {
    type: Number,
  },
  card_date: {
    type: String,
  },
  card_balance: {
    type: Number,
    default: 0,
  },
  card_activity: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
});

const Cards = mongoose.model('cards', CardsSchema);

module.exports = Cards;
