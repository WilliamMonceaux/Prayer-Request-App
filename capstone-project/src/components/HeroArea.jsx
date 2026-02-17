import { Typography, Button, Grid } from '@mui/material';

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
        background: 'linear-gradient(to bottom, #43E97B, #38F9D7)',
        width: '100%',
        borderBottom: '1px solid black',
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
          backgroundColor: 'white',
          width: '70%',
          flexGrow: 1,
        }}
      >
        <Grid item sx={{ width: '80%', textAlign: 'center', mt: 2 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: '4.0rem',
                sm: '5.5rem',
                md: '7.0rem',
                lg: '8.0rem',
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

        <Grid component="p" item sx={{ textAlign: 'center', mt: 2, width: '60%' }}>
          <Typography
            sx={{
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            {paragraph}
          </Typography>
        </Grid>

        {button && (
          <Grid item sx={{ my: 4 }}>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontWeight: 700,
                p: '1.2rem',
                backgroundColor: '#2196F3',
              }}
            >
              {button}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export { HeroArea };
