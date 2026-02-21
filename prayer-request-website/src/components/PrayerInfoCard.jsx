import { Box, Typography } from '@mui/material';

function PrayerInfoCard({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: '#EEEEEE',
        width: '100%',
        maxWidth: '450px',
        p: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: { xs: '2.5rem', md: '3.13rem' },
          textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }}>
        {description}
      </Typography>
    </Box>
  );
}

export { PrayerInfoCard };
