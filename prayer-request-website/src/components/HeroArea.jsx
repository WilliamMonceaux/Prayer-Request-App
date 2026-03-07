import { Typography, Grid } from '@mui/material';
import { RequestBtn } from '../components/RequestBtn';

function HeroArea({ heading, paragraph, button }) {
  return (
    <Grid
      container
      component="section"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '60vh',
        background:
          'linear-gradient(90deg, #43E97B 0%, #38F9D7 15%, transparent 15%, transparent 85%, #43E97B 85%, #38F9D7 100%)',
        width: '100%',
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          background: 'transparent',
          width: '70%',
          flexGrow: 1,
        }}
      >
        <Grid item sx={{ width: { xs: '100%', md: '80%' }, textAlign: 'center', mt: 2 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: '2.8rem',
                md: '6.10rem',
                xl: '7.63rem',
              },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              wordBreak: 'keep-all',
              textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            {heading}
          </Typography>
        </Grid>

        <Grid item sx={{ textAlign: 'center', mt: 2, width: '60%' }}>
          <Typography
            sx={{
              fontSize: { xs: '1.4rem', md: '1.6rem', xl: '2rem' },
              textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            {paragraph}
          </Typography>
        </Grid>

        <RequestBtn text="Request A Prayer" />
      </Grid>
    </Grid>
  );
}

export { HeroArea };
