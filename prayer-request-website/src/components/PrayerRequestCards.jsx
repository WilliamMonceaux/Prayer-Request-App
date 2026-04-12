'use client';
import { green, red } from '../lib/theme/customizations/themePrimitives';
import React, { useEffect, useState } from 'react';
import { StatusBadge } from './Buttons';
import { UserAvatar } from './UserAvatar';
import {
  Box,
  Typography,
  Container,
  Paper,
  styled,
  Stack,
  Button,
  Pagination,
  Skeleton,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useUserContext } from '@/context/UserContext';
import { Comments } from '@/components/Comments';
import { Edit as EditIcon } from '@mui/icons-material';

const PrayerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(255, 205, 210, 0.6)',
    borderColor: '#ffcdd2',
  },
}));

const getStatusColors = (status) => {
  if (status === 'Prayer Answered') {
    return {
      bg: green[50],
      border: green[200],
      shadow: green[200],
    };
  }
  return {
    bg: red[50],
    border: red[200],
    shadow: red[100],
  };
};

function PrayerRequestCards({ activeStatus }) {
  const { currentUser } = useUserContext();
  const [expandedComments, setExpandedComments] = useState({});
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);

  const limit = 5;

  const handleEditClick = (prayer) => {
    setSelectedPrayer(prayer);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/api/prayers/${selectedPrayer._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'edit',
          user_id: currentUser._id,
          editData: {
            title: selectedPrayer.title,
            description: selectedPrayer.description,
          },
        }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPrayers((prev) =>
          prev.map((p) => (p._id === selectedPrayer._id ? updatedPost : p))
        );
        setEditDialogOpen(false);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const toggleComments = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusChange = async (prayerId, newStatus) => {
    try {
      const response = await fetch(`/api/prayers/${prayerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'edit',
          editData: { status: newStatus },
          user_id: currentUser._id,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPrayers((prev) => prev.map((p) => (p._id === prayerId ? updatedPost : p)));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePray = async (prayerId) => {
    if (!currentUser?._id) return alert('Please log in to pray.');

    try {
      const response = await fetch(`/api/prayers/${prayerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser._id,
          action: 'togglePray',
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPrayers((prev) => prev.map((p) => (p._id === prayerId ? updatedPost : p)));
      }
    } catch (error) {
      console.error('Error toggling prayer:', error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [activeStatus]);

  useEffect(() => {
    const fetchPrayers = async () => {
      setLoading(true);
      try {
        const statusParam =
          activeStatus !== 'all' ? `&status=${encodeURIComponent(activeStatus)}` : '';
        const res = await fetch(
          `/api/prayers?page=${page}&limit=${limit}${statusParam}`
        );

        if (res.ok) {
          const data = await res.json();
          // If data.prayers is undefined, fallback to an empty array to prevent .map errors
          setPrayers(Array.isArray(data.prayers) ? data.prayers : []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error('Failed to fetch prayers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayers();
  }, [page, activeStatus]);

  if (loading) {
    return (
      <Container sx={{ py: 5, maxWidth: { md: '800px' } }}>
        {[...Array(3)].map((_, i) => (
          <Paper key={i} sx={{ p: 3, mb: 8, borderRadius: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Skeleton variant="circular" width={52} height={52} />
              <Skeleton variant="text" width="40%" height={30} />
            </Stack>
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <Skeleton variant="text" width="20%" />
          </Paper>
        ))}
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '40vh', display: 'flex', flexDirection: 'column' }}>
      <Container
        sx={{
          flexGrow: 1,
          py: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: '600px',
          maxWidth: { xs: '95%', sm: '85%', md: '800px', lg: '1000px', xl: '1200px' },
        }}
      >
        {prayers.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No active prayer requests.
          </Typography>
        ) : (
          <>
            {prayers.map((prayer) => {
              const isExpanded = expandedComments[prayer._id];
              const isAnonymous = prayer.isAnonymous;
              const username = prayer.user_id?.username || 'Community Member';
              const status = prayer.status || 'Need Prayers';
              const colors = getStatusColors(status);
              const hasPrayed = prayer.prayedBy?.includes(currentUser?._id);
              const isAuthor = currentUser?._id === prayer.user_id?._id;

              return (
                <PrayerCard
                  key={prayer._id}
                  elevation={0}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: colors.border,
                      boxShadow: `0px 8px 20px ${colors.shadow}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 2 },
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        order: { xs: 2, sm: 1 },
                        minWidth: 0,
                      }}
                    >
                      <UserAvatar
                        user={isAnonymous ? { name: '?' } : prayer.user_id}
                        sx={{
                          width: { xs: 40, md: 52, xl: 64 },
                          height: { xs: 40, md: 52, xl: 64 },
                        }}
                      />

                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          fontWeight: 600,
                          maxWidth: { xs: '180px', sm: '250px', md: '400px' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {isAnonymous ? 'Anonymous' : username}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        order: { xs: 1, sm: 2 },
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: 'flex-end',
                      }}
                    >
                      {isAuthor && (
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(prayer)}
                          sx={{
                            color: 'grey.400',
                            '&:hover': { color: 'primary.main' },
                          }}
                        >
                          <EditIcon fontSize="medium" />
                        </IconButton>
                      )}
                      <Button
                        onClick={() => handlePray(prayer._id)}
                        disabled={isAuthor}
                        startIcon={
                          <Box
                            sx={{
                              position: 'relative',
                              width: { xs: 20, md: 26, xl: 32 },
                              height: { xs: 20, md: 26, xl: 32 },
                            }}
                          >
                            <Image
                              src={
                                hasPrayed
                                  ? '/images/like-btn-praying.png'
                                  : '/images/like-btn-praying-outlined.png'
                              }
                              alt="Pray"
                              fill
                              style={{ objectFit: 'contain' }}
                              sizes="32px"
                            />
                          </Box>
                        }
                        sx={{
                          textTransform: 'none',
                          fontWeight: 700,
                          borderRadius: '2rem',
                          color: hasPrayed ? green[500] : 'inherit',
                          backgroundColor: hasPrayed
                            ? 'rgba(46, 125, 50, 0.08)'
                            : 'transparent',
                        }}
                      >
                        {hasPrayed ? 'Prayed' : 'Pray'}
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 800,
                        }}
                      >
                        {prayer.prayedCount || 0}
                      </Typography>
                      <Button
                        onClick={() => toggleComments(prayer._id)}
                        variant="body2"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 700,
                          borderRadius: '2rem',
                        }}
                      >
                        {isExpanded ? 'Hide' : 'Comment'}
                      </Button>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {prayer.comment_id?.length || 0}
                      </Typography>
                    </Stack>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {prayer.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 4,
                      lineHeight: 1.6,
                    }}
                  >
                    {prayer.description}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      mt: 'auto',
                    }}
                  >
                    <StatusBadge
                      sx={{
                        px: { xs: 1.5, xl: 3 },
                        py: { xs: 0.5, xl: 1.5 },
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        cursor: isAuthor ? 'pointer' : 'default',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        Status: &nbsp;
                      </Typography>

                      {isAuthor ? (
                        <Select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(prayer._id, e.target.value)
                          }
                          variant="standard"
                          disableUnderline
                          sx={{
                            border: 'none',
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                            typography: 'body2',
                            fontWeight: 500,
                            color: 'black',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                        >
                          <MenuItem value="Need Prayers">Need Prayers</MenuItem>
                          <MenuItem value="Prayer Answered">Prayer Answered</MenuItem>
                        </Select>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'black',
                            fontWeight: 500,
                          }}
                        >
                          {status}
                        </Typography>
                      )}
                    </StatusBadge>

                    <Typography
                      variant="caption"
                      sx={{
                        fontStyle: 'italic',
                      }}
                    >
                      {formatDistanceToNow(new Date(prayer.createdAt))} ago
                    </Typography>
                  </Box>

                  {isExpanded && (
                    <Box sx={{ mt: 2 }}>
                      <Comments prayerId={prayer._id} currentUser={currentUser} />
                    </Box>
                  )}
                </PrayerCard>
              );
            })}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, v) => setPage(v)}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
      </Container>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Prayer Request</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
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
              rows={4}
              label="Description"
              value={selectedPrayer?.description || ''}
              onChange={(e) =>
                setSelectedPrayer({ ...selectedPrayer, description: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Update Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export { PrayerRequestCards };
