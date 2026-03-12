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
      const response = await fetch('/api/user/update', {
        method: 'POST',
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
      } else {
        throw new Error('Update failed');
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
    <Box sx={{ p: 3 }}>
      <Card variant="outlined">
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
        >
          <Typography variant="h4">Profile Settings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56 }} />
            <Button variant="outlined" component="label">
              Change Photo
              <input hidden accept="image/*" type="file" />
            </Button>
          </Box>
          <TextField label="Username" defaultValue="User123" fullWidth />
          <TextField label="Email" defaultValue="user@example.com" fullWidth />
          <TextField label="New Password" type="password" fullWidth />
          <Button variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountSettings;
