import { Box, Typography, Container, Avatar } from '@mui/material';
import heartImg from '../assets/images/heart-like.png';

function PrayerRequestCards() {
  return (
    <Box
      sx={{
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          px: 4,
          py: 10,
          gap: 2,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#EEEEEE',
            borderRadius: 2,
            p: 3,
            position: 'relative',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.35)'
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar alt="User Profile" sx={{ fontSize: '1.4rem', color: 'black' }} />
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: '1.5rem', md: '2.0rem'} }}
              >
                Username
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box component='img' src={heartImg} alt='like button' sx={{ width: '3rem' }}>
                </Box>
                <Typography variant='h6' sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, ml: 0.5 }}>
                    0
                </Typography>
            </Box>
          </Box>
          <Typography variant='h6' sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, display: 'block', my: 3 }}>
            Title
          </Typography>
          <Typography variant='body1' sx={{ mt: 1, mb: 4, fontSize: { xs: '1.2rem', md: '1.6rem' }}}>
            This is a paragraph.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1, gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant='h6' sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    Status:
                </Typography>
                <Typography variant='body1' sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' }, fontWeight: 'bold'}}>
                    Need Prayers
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1' sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' }}}>
                    20 minutes ago
                </Typography>
                </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export { PrayerRequestCards };
