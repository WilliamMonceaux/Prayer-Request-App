const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A comment must belong to a author'],
    },
    prayer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prayer',
      required: [true, 'A comment must belong to a prayer post'],
    },
    content: {
      type: String,
      required: [true, 'Comment text cannot be empty'],
      trim: true,
      maxlength: [500, 'Comments cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = {
    Comment,
}
