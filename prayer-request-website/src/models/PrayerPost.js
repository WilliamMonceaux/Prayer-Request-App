const mongoose = require('mongoose');

const prayerPostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A prayer must belong to a user'],
    },
    comment_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
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
        values: ['1 Minute', '1 Week', '2 Weeks', '1 Month'],
        message: 'Please select a valid duration',
      },
    },
    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Need Prayers', 'Prayer Answered'],
      default: 'Need Prayers',
    },
    prayedCount: {
      type: Number,
      default: 0,
      min: 0,
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

const PrayerPost = mongoose.models.Prayer || mongoose.model('Prayer', prayerPostSchema);

export { PrayerPost };
