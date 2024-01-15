const Story = require('../models/Story');

exports.getCardStory = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const stories = await Story.find({ sender_card: cardNumber });
    return res.status(200).json({
      status: 200,
      data: stories,
    });
  } catch (err) {
    return res.status(500).send('Interval server error');
  }
};
