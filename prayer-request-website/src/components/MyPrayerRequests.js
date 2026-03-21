'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';

function MyPrayerRequests() {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);

  useEffect(() => {
    if (selectedPrayer) {
      console.log('State updated: current selectedPrayer is', selectedPrayer.title);
    }
  }, [selectedPrayer]);

  const fetchPrayers = async () => {
    try {
      const res = await fetch('/api/users/prayers');
      const data = await res.json();
      if (res.ok) setPrayers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleDelete = async () => {
    if (!selectedPrayer) return;
    try {
      const res = await fetch(`/api/prayers/${selectedPrayer._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: selectedPrayer.user_id }),
      });
      if (res.ok) {
        setDeleteDialogOpen(false);
        fetchPrayers();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleStatusChange = async (id, newStatus, userId) => {
    const res = await fetch(`/api/prayers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, editData: { status: newStatus } }),
    });
    if (res.ok) fetchPrayers();
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/api/prayers/${selectedPrayer._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: selectedPrayer.user_id,
          editData: {
            title: selectedPrayer.title,
            description: selectedPrayer.description,
            status: selectedPrayer.status,
          },
        }),
      });
      if (res.ok) {
        setEditOpen(false);
        fetchPrayers();
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: { xs: '2rem', md: '2.5rem' },
        }}
      >
        My Prayer Requests
      </Typography>

      <Stack spacing={3}>
        {prayers.map((prayer) => (
          <Card
            key={prayer._id}
            variant="outlined"
            sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.4rem', md: '1.8rem', xl: '2rem' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: '#1a1a1a',
                    flex: 1,
                  }}
                >
                  {prayer.title}
                </Typography>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, zIndex: 10 }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      console.log('Edit button clicked for:', prayer.title);
                      e.stopPropagation();
                      setSelectedPrayer(prayer);
                      setEditOpen(true);
                    }}
                    sx={{ pointerEvents: 'auto' }}
                  >
                    <EditIcon fontSize="medium" sx={{ color: '#999' }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      console.log('Delete button clicked for:', prayer.title);
                      e.stopPropagation();
                      setSelectedPrayer(prayer);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ pointerEvents: 'auto' }}
                  >
                    <DeleteIcon fontSize="medium" sx={{ color: '#d32f2f' }} />
                  </IconButton>

                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextStatus =
                        prayer.status === 'Need Prayers'
                          ? 'Prayer Answered'
                          : 'Need Prayers';
                      handleStatusChange(prayer._id, nextStatus, prayer.user_id);
                    }}
                    sx={{
                      bgcolor:
                        prayer.status === 'Prayer Answered' ? '#f0f9f4' : '#fff5f5',
                      color:
                        prayer.status === 'Prayer Answered' ? '#2e7d32' : '#b71c1c',
                      px: 2,
                      py: 0.5,
                      borderRadius: 5,
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', md: '1.0rem' },
                      fontWeight: 'bold',
                      border: `1px solid ${prayer.status === 'Prayer Answered' ? '#e1f3e8' : '#ffebee'}`,
                      '&:hover': {
                        bgcolor:
                          prayer.status === 'Prayer Answered' ? '#e1f3e8' : '#ffebee',
                      },
                      position: 'relative',
                      zIndex: 9999,
                      pointerEvents: 'auto',
                    }}
                  >
                    {prayer.status}
                  </Button>
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: '#5f6368',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.2rem', xl: '1.4rem' },
                  lineHeight: 1.6,
                }}
              >
                {prayer.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 2, md: 5 },
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' },
                    fontWeight: 'bold',
                  }}
                >
                  Prayers: {prayer.prayedCount || 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' },
                    fontWeight: 'bold',
                  }}
                >
                  Comments: {prayer.commentCount || 0}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' },
                    color: '#999',
                  }}
                >
                  Duration: {prayer.duration}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' },
                    color: '#999',
                  }}
                >
                  Posted: {new Date(prayer.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>

            <Accordion elevation={0} sx={{ borderTop: '1px solid #f0f0f0' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' },
                    color: '#1a73e8',
                    fontWeight: 600,
                  }}
                >
                  Words of Encouragement ({prayer.commentCount || 0})
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
                <CommentSection prayerId={prayer._id} />
              </AccordionDetails>
            </Accordion>
          </Card>
        ))}
      </Stack>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="xs"
        sx={{ zIndex: 9999 }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem', xl: '1.6rem' },
            fontWeight: 'bold',
          }}
        >
          Edit Request
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={selectedPrayer?.title || ''}
              onChange={(e) =>
                setSelectedPrayer({ ...selectedPrayer, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={selectedPrayer?.description || ''}
              onChange={(e) =>
                setSelectedPrayer({ ...selectedPrayer, description: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sx={{ zIndex: 9999 }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem', xl: '1.6rem' },
            fontWeight: 'bold',
          }}
        >
          Delete Prayer Request?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function CommentSection({ prayerId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${prayerId}`);
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (prayerId) fetchComments();
  }, [prayerId]);

  if (loading)
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    );
  if (comments.length === 0)
    return (
      <Typography variant="caption" sx={{ p: 2, display: 'block', color: '#999' }}>
        No words of encouragement yet.
      </Typography>
    );

  return (
    <Stack spacing={2.5} sx={{ p: 1 }}>
      {comments.map((c) => (
        <Box key={c._id} sx={{ display: 'flex', gap: 2.5 }}>
          <Avatar
          src={c.user_id?.profilePicture}
            sx={{
              width: 40,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              borderRadius: '50%',
              bgcolor: 'grey.300',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.6rem',
              fontWeight: 'bold',
            }}
          >
            {c.user_id?.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box>
            <Typography
              variant="caption"
              sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1a1a' }}
            >
              {c.user_id?.username || 'Anonymous'} •{' '}
              {new Date(c.createdAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '1.2rem', color: '#444', mt: 0.5 }}
            >
              {c.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default MyPrayerRequests;
