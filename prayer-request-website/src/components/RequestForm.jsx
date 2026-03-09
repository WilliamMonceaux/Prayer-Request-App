'use client';
import React, { useState } from 'react';
import {
  Stack,
  styled,
  Typography,
  Box,
  TextField,
  Paper,
  FormControlLabel,
  Radio,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@mui/material';
import Image from 'next/image';
import CheckMark from '../../public/images/checkmark.png';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';

const PageWrapper = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

function RequestForm() {
  const { user } = useUserContext();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [request, setRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [duration, setDuration] = useState('1 week');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert('Please sign in to post a request.');
      return;
    }

    try {
      const res = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user._id,
          title,
          description: request,
          duration,
          isAnonymous,
        }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const errorData = await res.json();
        console.error('Post failed:', errorData.error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <PageWrapper component="main">
      <Paper
        elevation={3}
        component="article"
        sx={{
          p: { xs: 3, sm: 4, md: 6 },
          mx: 'auto',
          borderRadius: 4,
          width: {
            xs: '95%',
            sm: '85%',
            md: '70%',
            lg: '60%',
            xl: '50%',
          },
          maxWidth: '1200px',
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            textAlign: 'left',
            fontWeight: 'bold',
            mb: 4,
            fontSize: '3.125rem',
            color: 'text.primary',
          }}
        >
          Request Prayer
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Prayer request submission form"
        >
          <Box component="section" sx={{ mb: 3 }}>
            <TextField
              id="request-input"
              fullWidth
              multiline
              rows={6}
              placeholder="Please pray for me..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              inputProps={{
                maxLength: 1000,
                'aria-required': 'true',
              }}
              InputLabelProps={{ shrink: false }}
              variant="filled"
              helperText={`${request.length}/1000`}
              FormHelperTextProps={{ sx: { textAlign: 'right' } }}
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
          </Box>
          <Box
            component="section"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 4,
            }}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={isAnonymous}
                  onClick={() => setIsAnonymous(!isAnonymous)}
                />
              }
              label="Post as Anonymous"
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" component="label" htmlFor="duration-select">
                Duration:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  id="duration-select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <MenuItem value="1 day">1 Day</MenuItem>
                  <MenuItem value="4 days">4 Days</MenuItem>
                  <MenuItem value="1 week">1 Week</MenuItem>
                  <MenuItem value="2 weeks">2 Weeks</MenuItem>
                  <MenuItem value="1 month">1 Month</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            endIcon={
              <Image
                src={CheckMark}
                alt=""
                width={28}
                height={28}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            }
            sx={{
              fontSize: { md: '1.4rem', xl: '1.6rem' },
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 'none',
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2',
                boxShadow: 'none',
              },
            }}
          >
            Submit Request
          </Button>
        </Box>
      </Paper>
    </PageWrapper>
  );
}

export { RequestForm };
