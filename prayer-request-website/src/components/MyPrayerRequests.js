'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Chip,
} from '@mui/material';

function MyPrayerRequests() {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const res = await fetch('/api/users/prayers');
        const data = await res.json();

        if (res.ok) {
          setPrayers(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Prayer Requests
      </Typography>

      {prayers.length === 0 ? (
        <Typography variant="body1">
          You haven't posted any prayer requests yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {prayers.map((prayer) => (
            <Card key={prayer._id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{prayer.title}</Typography>
                  <Chip
                    label={prayer.status}
                    color={prayer.status === 'Prayer Answered' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {prayer.description}
                </Typography>

                <Box sx={{ mt: 1, display: 'flex', gap: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    Prayers: {prayer.prayedCount || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {/* Use the new property from the backend */}
                    Comments: {prayer.commentCount || 0}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Duration: {prayer.duration}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default MyPrayerRequests;
