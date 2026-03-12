import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import { useState, useEffect } from 'react';

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
        console.error('Failed to load prayers.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

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
                <Typography variant="h6">{prayer.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {prayer.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                  <Typography variant="caption">
                    Prayer Count: {prayer.PrayedCount|| 0}
                  </Typography>
                  <Typography variant="caption">
                    Comments: {prayer.comments_id?.length || 0}
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
