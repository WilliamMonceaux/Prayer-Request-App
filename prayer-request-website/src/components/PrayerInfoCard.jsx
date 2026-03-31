import { Box, Typography, Paper } from '@mui/material';

function PrayerInfoCard({ title, description, quote, image }) {
  return (
    <Paper
    elevation={3}
      sx={{
        width: '100%',
        maxWidth: '425px',
        p: 4,
        borderRadius: 2,
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
          textShadow: 'var(--mui-palette-text-glow)',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
      >
        {description}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2 }}
      >
        {quote}
      </Typography>
    </Paper>
  );
}

export { PrayerInfoCard };
