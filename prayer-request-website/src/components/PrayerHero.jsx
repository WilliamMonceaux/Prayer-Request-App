import { Grid, Typography, Box } from '@mui/material';

function PrayerHero() {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: {
            xs: '3.42rem',
            md: '3.91rem',
            xl: '4.88rem',
          },
          fontWeight: 'bold',
          textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
          mb: 4,
        }}
      >
        Understanding Prayer
      </Typography>

      <Box
        component="img"
        src="/images/pray.png"
        alt="Person praying"
        sx={{ width: '100%', maxWidth: 350 }}
      />
    </Grid>
  );
}

export { PrayerHero };
