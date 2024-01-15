const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  story_id: {
    type: String,
  },
  sender_card: {
    type: mongoose.Types.ObjectId,
    ref: 'cards',
  },
  sender: {
    type: String,
  },
  recipient: {
    type: String,
  },
  sum: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Story = mongoose.model('story', StorySchema);

module.exports = Story;
