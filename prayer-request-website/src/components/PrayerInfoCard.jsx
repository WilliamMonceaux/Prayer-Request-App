import { Box, Typography } from '@mui/material';

function PrayerInfoCard({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '450px',
        p: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
        border: '2px solid black'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: 'clamp(2.5rem, 1.5vw + 2rem, 3.13rem)',
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
