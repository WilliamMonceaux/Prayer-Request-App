'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
  Divider,
  CircularProgress,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

function Comments({ prayerId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/comments/${prayerId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error('Failed to fetch comments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [prayerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${prayerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prayer_id: prayerId,
          user_id: currentUser._id,
          content: newComment,
        }),
      });

      if (res.ok) {
        const savedComment = await res.json();
        setComments((prev) => [...prev, { ...savedComment, user_id: currentUser }]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error posting comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}
      >
        Words of Encouragement ({comments.length})
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          comments.map((comment, index) => (
            <Box key={comment._id || index}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  src={comment.user_id?.profilePicture}
                  sx={{ width: 32, height: 32, fontSize: '0.8rem' }}
                >
                  {comment.user_id?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {comment.user_id?.username || 'Community Member'} •{' '}
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {comment.content}
                  </Typography>
                </Box>
              </Stack>
              {index < comments.length - 1 && (
                <Divider sx={{ mt: 1.5, opacity: 0.5 }} />
              )}
            </Box>
          ))
        )}
      </Stack>

      {currentUser ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Write a word of encouragement..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 1, backgroundColor: '#f9f9f9' }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || !newComment.trim()}
            sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 600 }}
          >
            {submitting ? 'Posting...' : 'Post Encouragement'}
          </Button>
        </Box>
      ) : (
        <Typography variant="caption" color="text.secondary">
          Please log in to leave a comment.
        </Typography>
      )}
    </Box>
  );
}

export { Comments };
