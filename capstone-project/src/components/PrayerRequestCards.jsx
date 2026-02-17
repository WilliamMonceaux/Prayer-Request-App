import { Box, Typography, Container, Avatar } from '@mui/material';

function PrayerRequestCards() {
  return (
    <Box
      sx={{
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid blue',
        my: 10,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          border: '2px solid green',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#EEEEEE',
            borderRadius: 2,
            p: 3,
            border: '2px solid black',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              border: '2px solid orange',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                border: '2px solid red',
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
          </Box>
          <Typography variant='h6' sx={{ fontSize: { xs: '1.5rem', md: '2.0rem' }, display: 'block', my: 3 }}>
            Title
          </Typography>
          <Typography variant='body1' sx={{ mt: 1, mb: 4, fontSize: { xs: '1.2rem', md: '1.6rem' }}}>
            This is a paragraph.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid pink', mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1, gap: 1, border: '2px solid lime' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '2px solid yellow' }}>
                <Typography variant='h6' sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    Status:
                </Typography>
                <Typography variant='body1' sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' }, fontWeight: 'bold'}}>
                    Need Prayers
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid green'}}>
                <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' }, fontWeight: 'bold'}}>
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
