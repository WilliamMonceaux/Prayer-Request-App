'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  Divider,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

function AccountSettings() {
  const router = useRouter();
  const { currentUser, handleUpdateUser, loading } = useUserContext();
  const fileInputRef = useRef(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        profilePicture: '',
        password: '',
      });
      setImageRemoved(false);
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: 'File is too large (max 2MB)',
        severity: 'error',
      });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      setImageRemoved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = () => {
    setFormData((prev) => ({ ...prev, profilePicture: '' }));
    setImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);

      if (formData.password) {
        data.append('password', formData.password);
      }

      if (fileInputRef.current && fileInputRef.current.files[0]) {
        data.append('profilePicture', fileInputRef.current.files[0]);
      }

      const response = await fetch('/api/users/profile', {
        method: 'PATCH',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        handleUpdateUser(result.user);
        setSnackbar({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success',
        });
        setFormData((prev) => ({ ...prev, password: '', profilePicture: '' }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/users/profile', { method: 'DELETE' });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Account deleted. Redirecting...',
          severity: 'success',
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Delete failed. Please try again.',
        severity: 'error',
      });
      setIsDeleting(false);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 'auto', display: 'block' }} />;

  const displayImage = imageRemoved
    ? null
    : formData.profilePicture || currentUser?.profilePicture;

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        overflowY: 'auto',
        pb: 10,
      }}
    >
      <Card variant="outlined" sx={{ width: '100%', maxWidth: 550, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Profile Settings
          </Typography>

          <Stack spacing={3} sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={displayImage}
                sx={{ width: 80, height: 80, fontSize: '2.5rem' }}
              >
                {!displayImage && formData.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Change Photo
                  <input
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {displayImage && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemovePicture}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
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
              label="Change Password"
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
              sx={{ bgcolor: '#1e293b', mt: 2, '&:hover': { bgcolor: '#334155' } }}
            >
              Save Changes
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {showDeleteConfirm && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Card sx={{ maxWidth: 400, p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 3, fontSize: '1.4rem' }}>
              Confirm Deletion
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                variant="contained"
                color="error"
                disabled={isDeleting}
              >
                {isDeleting ? 'Processing...' : 'Delete My Account'}
              </Button>
            </Stack>
          </Card>
        </Box>
      )}

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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AccountSettings;
