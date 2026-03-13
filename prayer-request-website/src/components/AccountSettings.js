'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useUserContext } from '@/context/UserContext';

function AccountSettings() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { currentUser, handleUpdateUser, loading } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
      });
    }
  }, [currentUser]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        handleUpdateUser(updatedUser.user);
        setSnackbar({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success',
        });

        setFormData((prev) => ({ ...prev, password: '' }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error',
      });
    }
  };

  if (loading) return <CircularProgress sx={{ m: 'auto', display: 'block' }} />;

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Card variant="outlined" sx={{ width: '100%', maxWidth: 550, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Profile Settings
          </Typography>

          <Stack spacing={3} sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={currentUser?.profilePicture}
                sx={{ width: 80, height: 80, fontSize: '2.5rem' }}
              >
                {!currentUser?.profilePicture &&
                  formData.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                Change Photo
                <input hidden accept="image/*" type="file" />
              </Button>
            </Box>

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              onClick={onSave}
              sx={{ bgcolor: '#1e293b', mt: 2 }}
            >
              Save Changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AccountSettings;
