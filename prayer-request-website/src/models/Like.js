const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Like must be associated with a user'],
    },
    prayer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prayer',
      required: [true, 'Like must be associated with a prayer post'],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

likesSchema.index({ user_id: 1, prayer_id: 1 }, { unique: true });

export const Like = mongoose.models.Like || mongoose.model('Like', LikeSchema);
