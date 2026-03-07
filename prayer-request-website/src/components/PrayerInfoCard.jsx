import { Box, Typography } from '@mui/material';

function PrayerInfoCard({ title, description }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '425px',
        p: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
        border: '2px solid black',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: {
            xs: '2.75rem',
            md: '3.15rem',
            xl: '3.9rem',
          },
          textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: '1.4rem', md: '1.6rem', xl: '2.0rem' } }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export { PrayerInfoCard };
