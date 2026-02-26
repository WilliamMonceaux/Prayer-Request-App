const mongoose = require('mongoose');

const prayerPostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A prayer must belong to a user'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Exceeded 1000 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Please select a prayer duration'],
      enum: {
        values: ['1 day', '4 days', '1 week', '2 weeks', '1 month'],
        message: 'Please select a valid duration',
      },
    },
    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Need Prayers', 'Prayer Answered', 'Expired'],
      default: 'Need Prayers',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PrayerPost = mongoose.model('Prayer', prayerPostSchema);

module.exports = {
  PrayerPost,
};
