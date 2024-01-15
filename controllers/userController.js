/* eslint-disable no-underscore-dangle */
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Cards = require('../models/Cards');
const { sign } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const user = new Users({
      user_id: uuidv4(),
      user_name: req.body.userName,
      last_name: req.body.lastName,
      user_password: req.body.password,
    });
    await user.save();
    return res.status(200).json({
      status: 200,
      role: user.user_role,
      token: sign(user._id.toString()),
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.login = async (req, res) => {
  try {
    const [user] = await Users.find({
      user_name: req.body.userName,
      user_password: req.body.password,
    });
    return res.status(200).json({
      status: 200,
      role: user.user_role,
      token: sign(user._id.toString()),
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};

exports.getUserCards = async (req, res) => {
  try {
    const { userId } = req.headers;
    const userData = [];
    const UserCards = await Cards.find({ user: userId });
    const user = await Users.find({ _id: userId });
    userData.push(UserCards, user);
    return res.status(200).json({
      status: 200,
      data: userData,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};
