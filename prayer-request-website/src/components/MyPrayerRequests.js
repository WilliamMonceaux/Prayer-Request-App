'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, CircularProgress, Stack, Card, CardContent,
  Button, IconButton, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Select, MenuItem, Accordion, 
  AccordionSummary, AccordionDetails
} from '@mui/material';
import { Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

function MyPrayerRequests() {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);

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

  const handleStatusChange = async (id, newStatus, userId) => {
    const res = await fetch(`/api/prayers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, editData: { status: newStatus } }),
    });
    if (res.ok) fetchPrayers();
  };

  const handleEditSubmit = async () => {
    const res = await fetch(`/api/prayers/${selectedPrayer._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_id: selectedPrayer.user_id,
        editData: {
          title: selectedPrayer.title, 
          description: selectedPrayer.description 
        }
      }),
    });
    if (res.ok) {
      setEditOpen(false);
      fetchPrayers();
    }
  };

  if (loading) return (
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
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        My Prayer Requests
      </Typography>

      <Stack spacing={3}>
        {prayers.map((prayer) => (
          <Card key={prayer._id} variant="outlined" sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontSize: { xs: '1.4rem', md: '1.8rem', xl: '2rem' },
                    fontWeight: 600, 
                    lineHeight: 1.2, 
                    color: '#1a1a1a' 
                  }}
                >
                  {prayer.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <IconButton size="small" onClick={() => { setSelectedPrayer(prayer); setEditOpen(true); }}>
                    <EditIcon fontSize="medium" sx={{ color: '#999' }} />
                  </IconButton>
                  <Select
                    value={prayer.status}
                    size="small"
                    variant="standard"
                    disableUnderline
                    onChange={(e) => handleStatusChange(prayer._id, e.target.value, prayer.user_id)}
                    sx={{
                      bgcolor: prayer.status === 'Prayer Answered' ? '#f0f9f4' : '#fff5f5',
                      color: prayer.status === 'Prayer Answered' ? '#2e7d32' : '#b71c1c',
                      px: 2.5, py: 0.75, borderRadius: 5, 
                      fontSize: { xs: '0.9rem', md: '1.0rem', xl: '1.2rem'},
                      fontWeight: 'bold',
                      border: `1px solid ${prayer.status === 'Prayer Answered' ? '#e1f3e8' : '#ffebee'}`
                    }}
                  >
                    <MenuItem value="Need Prayers">Need Prayers</MenuItem>
                    <MenuItem value="Prayer Answered">Prayer Answered</MenuItem>
                  </Select>
                </Box>
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#5f6368', 
                  mb: 4, 
                  fontSize: { xs: '1rem', md: '1.2rem', xl: '1.4rem' },
                  lineHeight: 1.6 
                }}
              >
                {prayer.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 5 }, alignItems: 'center' }}>
                <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' }, fontWeight: 'bold' }}>Prayers: {prayer.prayedCount || 0}</Typography>
                <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' }, fontWeight: 'bold' }}>Comments: {prayer.commentCount || 0}</Typography>
                <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' }, color: '#999' }}>Duration: {prayer.duration}</Typography>
                <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' }, color: '#999' }}>
                  Posted: {new Date(prayer.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>

            <Accordion elevation={0} sx={{ borderTop: '1px solid #f0f0f0' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.1rem', xl: '1.3rem' }, color: '#1a73e8', fontWeight: 600 }}>
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

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Request</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField 
              fullWidth 
              label="Title" 
              value={selectedPrayer?.title || ''} 
              onChange={(e) => setSelectedPrayer({...selectedPrayer, title: e.target.value})} 
            />
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              label="Description" 
              value={selectedPrayer?.description || ''} 
              onChange={(e) => setSelectedPrayer({...selectedPrayer, description: e.target.value})} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
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
        if (!res.ok) throw new Error('Failed to fetch');
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

  if (loading) return <Box sx={{ p: 2, textAlign: 'center' }}><CircularProgress size={24} /></Box>;
  if (comments.length === 0) return <Typography variant="caption" sx={{ p: 2, display: 'block', color: '#999' }}>No words of encouragement yet.</Typography>;

  return (
    <Stack spacing={2.5} sx={{ p: 1 }}>
      {comments.map((c) => (
        <Box key={c._id} sx={{ display: 'flex', gap: 2.5 }}>
          <Box 
            sx={{ 
              width: 40, height: 40,
              borderRadius: '50%', bgcolor: 'grey.300', color: 'text.primary',
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              fontSize: '1.6rem', fontWeight: 'bold' 
            }}
          >
            {c.user_id?.username?.charAt(0).toUpperCase() || 'U'}
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1a1a' }}>
              {c.user_id?.username || 'Anonymous'} • {new Date(c.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#444', mt: 0.5 }}>
              {c.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default MyPrayerRequests;