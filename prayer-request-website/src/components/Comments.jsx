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
}

useEffect(() => {
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?prayer_id=${prayerId}`);
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
