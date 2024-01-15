const { v4: uuidv4 } = require('uuid');
const Cards = require('../models/Cards');
const Story = require('../models/Story');

function initValues(numValues) {
  const values = new Array(numValues);
  for (let i = 0; i < values.length; i += 1) {
    values[i] = i;
  }
  return values;
}

function getValue(array) {
  if (!array.length) {
    throw new Error('array is empty, no more random values');
  }
  const i = Math.floor(Math.random() * array.length);
  const returnVal = array[i];
  array.splice(i, 1);
  return returnVal;
}

const rands = initValues(10000);

const date = new Date();
const later = date.getDate() + 3;
const getMonth = date.getMonth() + 1;
const getYear = date.getFullYear();
const cardDate = `${later}/${getMonth}/${getYear}`;

exports.addCard = async (req, res) => {
  try {
    const { userId } = req.headers;
    const card = new Cards({
      card_id: uuidv4(),
      card_number: `86004460${getValue(rands)}`,
      card_date: cardDate,
      user: userId,
    });
    await card.save();
    return res.status(200).json({
      status: 200,
      data: card,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.restoreCard = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const card = await Cards.findOne({ card_number: cardNumber });
    card.card_activity = true;
    card.card_date = cardDate;
    await card.save();
    return res.status(200).json({
      status: 200,
      data: card,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.transfers = async (req, res) => {
  try {
    const sender = await Cards.findOne({
      card_number: req.body.senderCardNumber,
    }).populate('user');
    const recipient = await Cards.findOne({
      card_number: req.body.cardNumber,
    }).populate('user');
    if (recipient) {
      if (sender.card_activity === true) {
        if (sender.card_balance > +req.body.sum) {
          await Cards.findOneAndUpdate(
            { card_number: req.body.senderCardNumber },
            { card_balance: sender.card_balance - +req.body.sum },
          );
          await Cards.findOneAndUpdate(
            { card_number: req.body.cardNumber },
            { card_balance: recipient.card_balance + +req.body.sum },
          );
          const newStory = new Story({
            story_id: uuidv4(),
            // eslint-disable-next-line no-underscore-dangle
            sender_card: sender._id.toString(),
            sender: `${sender.user.user_name} ${sender.user.last_name}`,
            recipient: `${recipient.user.user_name} ${recipient.user.last_name}`,
            sum: req.body.sum,
          });
          await newStory.save();
        }
      }
    }
    return res.status(200).send('success');
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.getCardsCardNumber = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const card = await Cards.findOne({ card_number: cardNumber }).populate(
      'user',
    );
    return res.status(200).json({
      status: 200,
      data: card,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.getCardsCardUserId = async (req, res) => {
  try {
    const { userId } = req.headers;
    const card = await Cards.find({ user: userId }).populate('user');
    card.map(async (e) => {
      if (+e.card_date.slice(0, 2) === +later - 3) {
        e.card_activity = false;
        await Cards.updateOne(
          { card_id: e.card_id },
          { $set: { card_activity: false } },
        );
      }
      return e;
    });
    const cards = await Cards.find({ user: userId }).populate('user');
    return res.status(200).json({
      status: 200,
      data: cards,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Cards.find().populate('user');
    return res.status(200).json({
      status: 200,
      data: cards,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};
