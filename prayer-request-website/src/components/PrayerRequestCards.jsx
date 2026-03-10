'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Avatar, CircularProgress, Paper, styled } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

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
    transform: 'translateY(-2px)',
  },
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '4px',
  backgroundColor: '#ffebee',
  border: '1px solid #ffcdd2',
}));

function PrayerRequestCards() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          gap: 4,
          maxWidth: { xs: '95%', sm: '85%', md: '800px', lg: '1000px', xl: '1200px' } 
        }}
      >
        {prayers.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">No active prayer requests.</Typography>
        ) : (
          prayers.map((prayer) => {
            const isAnonymous = prayer.isAnonymous;
            const username = prayer.user_id?.username || 'Community Member';
            const profilePic = prayer.user_id?.profilePicture;
            const initial = username.charAt(0).toUpperCase();

            return (
              <PrayerCard key={prayer._id} elevation={0}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={(!isAnonymous && profilePic) ? profilePic : undefined} 
                      sx={{ 
                        bgcolor: 'grey.200', 
                        color: 'black', 
                        fontWeight: 'bold',
                        // Bolder size for xl screens
                        width: { xs: 40, md: 48, xl: 60 }, 
                        height: { xs: 40, md: 48, xl: 60 },
                        fontSize: { xs: '1.6rem', xl: '2rem' } 
                      }}
                    >
                      {isAnonymous ? '?' : initial}
                    </Avatar>
                    
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '1.4rem', xl: '1.8rem' } 
                      }}
                    >
                      {isAnonymous ? 'Anonymous' : username}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      component="img" 
                      src="/images/heart-like.png" 
                      alt="like" 
                      sx={{ width: { xs: 28, xl: 45 }, opacity: 0.8 }} 
                    />
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', xl: '2rem' } }}>0</Typography>
                  </Box>
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 1, 
                    fontSize: { xs: '1.4rem', xl: '2.5rem' } 
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
                    fontSize: { xs: '1.2rem', xl: '1.8rem' } 
                  }}
                >
                  {prayer.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <StatusBadge sx={{ px: { xl: 3 }, py: { xl: 1.5 } }}>
                    <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: { xs: '1rem', xl: '1.6rem' } }}>
                      Status: &nbsp;
                    </Typography>
                    <Typography sx={{ color: 'black', fontWeight: 500, fontSize: { xs: '1rem', xl: '1.6rem' } }}>
                      {prayer.status || 'Need Prayers'}
                    </Typography>
                  </StatusBadge>

                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'grey.500', 
                      fontStyle: 'italic', 
                      fontSize: { xs: '1rem', xl: '1.6rem' } 
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