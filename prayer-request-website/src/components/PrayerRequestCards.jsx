'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  Paper,
  styled,
  Stack,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useUserContext } from '@/context/UserContext';

const PrayerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(255, 205, 210, 0.6)',
    borderColor: '#ffcdd2',
  },
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '4px',
  backgroundColor: '#ffebee',
  border: '1px solid',
}));

const getStatusColors = (status) => {
  if (status === 'Prayer Answered') {
    return {
      bg: '#e8f5e9',
      border: '#a5d6a7',
      shadow: 'rgba(165, 214, 167, 0.6)',
    };
  }
  return {
    bg: '#ffebee',
    border: '#ffcdd2',
    shadow: 'rgba(255, 205, 210, 0.6)',
  };
};

function PrayerRequestCards() {
  const { currentUser } = useUserContext();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchPrayers = async () => {
      try {
        const res = await fetch('/api/prayers');
        if (res.ok) {
          const data = await res.json();
          setPrayers(data);
        }
      } catch (err) {
        console.error('Failed to fetch prayers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
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
          maxWidth: { xs: '95%', sm: '85%', md: '800px', lg: '1000px', xl: '1200px' },
        }}
      >
        {prayers.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No active prayer requests.
          </Typography>
        ) : (
          prayers.map((prayer) => {
            const isAnonymous = prayer.isAnonymous;
            const username = prayer.user_id?.username || 'Community Member';
            const profilePic = prayer.user_id?.profilePicture;
            const initial = username.charAt(0).toUpperCase();
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={!isAnonymous && profilePic ? profilePic : undefined}
                      sx={{
                        bgcolor: 'grey.200',
                        color: 'black',
                        fontWeight: 'bold',
                        width: { xs: 40, md: 48, xl: 60 },
                        height: { xs: 40, md: 48, xl: 60 },
                        fontSize: { xs: '1.6rem', xl: '2rem' },
                      }}
                    >
                      {isAnonymous ? '?' : initial}
                    </Avatar>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.4rem', xl: '1.8rem' },
                      }}
                    >
                      {isAnonymous ? 'Anonymous' : username}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      onClick={() => handlePray(prayer._id)}
                      disabled={isAuthor}
                      startIcon={
                        <Box
                          sx={{
                            position: 'relative',
                            width: { xs: 24, xl: 32 },
                            height: { xs: 24, xl: 32 },
                          }}
                        >
                          <Image
                            src={
                              hasPrayed
                                ? '/images/praying-hands.png'
                                : '/images/outlined-praying-hands.png'
                            }
                            alt="Pray"
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                      }
                      sx={{
                        textTransform: 'none',
                        fontWeight: 700,
                        borderRadius: '20px',
                        fontSize: { xs: '0.9rem', xl: '1.2rem' }, // Scaled for your large monitor
                        color: hasPrayed ? '#2e7d32' : 'inherit',
                        backgroundColor: hasPrayed
                          ? 'rgba(46, 125, 50, 0.08)'
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: hasPrayed
                            ? 'rgba(46, 125, 50, 0.12)'
                            : 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      {hasPrayed ? 'Prayed' : 'Pray'}
                    </Button>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800,
                        fontSize: { md: '1.4rem', xl: '1.6rem' },
                      }}
                    >
                      {prayer.prayedCount || 0}
                    </Typography>
                  </Stack>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '1.4rem', xl: '2.5rem' },
                  }}
                >
                  {prayer.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.2rem', xl: '1.8rem' },
                  }}
                >
                  {prayer.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <StatusBadge
                    sx={{
                      px: { xl: 3 },
                      py: { xl: 1.5 },
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', xl: '1.6rem' },
                      }}
                    >
                      Status: &nbsp;
                    </Typography>
                    <Typography
                      sx={{
                        color: 'black',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', xl: '1.6rem' },
                      }}
                    >
                      {prayer.status || 'Need Prayers'}
                    </Typography>
                  </StatusBadge>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'grey.500',
                      fontStyle: 'italic',
                      fontSize: { xs: '1rem', xl: '1.6rem' },
                    }}
                  >
                    {formatDistanceToNow(new Date(prayer.createdAt))} ago
                  </Typography>
                </Box>
              </PrayerCard>
            );
          })
        )}
      </Container>
    </Box>
  );
}

export { PrayerRequestCards };
