import { Box, Typography } from '@mui/material';

function PrayerInfoCard({ title, description, quote, image }) {
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
      {image && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>{image}</Box>
      )}
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: {
            xs: '2.0rem',
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
      <Typography
        variant="body1"
        sx={{ mt: 2, fontSize: { xs: '1.4rem', md: '1.6rem', xl: '2.0rem' } }}
      >
        {quote}
      </Typography>
    </Box>
  );
}

export { PrayerInfoCard };
