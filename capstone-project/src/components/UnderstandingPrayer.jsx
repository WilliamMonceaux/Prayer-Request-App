import { Box, Container, Grid, Typography } from '@mui/material';
import prayImg from '../assets/images/pray.png';

function UnderstandingPrayer() {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        my: 10,
        border: '2px solid brown',
      }}
    >

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 0,
          border: '2px solid green',
          width: '100%',
        }}
      >
        
        <Grid
          container
          sx={{
            flexGrow: 1,
            width: '100%',
            border: '2px solid red',
          }}
        >

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
              border: '2px solid aqua',
            }}
          >

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '3.13rem', md: '4.2rem' },
                fontWeight: 'bold',
                textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
                mb: 4,
              }}
            >
              Understanding Prayer
            </Typography>

            <Box
              component="img"
              src={prayImg}
              alt="Person praying"
              sx={{ width: '100%', maxWidth: 400 }}
            />
          </Grid>

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
              gap: 4,
              border: '2px solid blue'
            }}
          >
            <Box sx={{ backgroundColor: '#EEEEEE', width: '100%', p: 4, borderRadius: 2, boxShadow: '0px 4px 10px rgba(0,0,0,0.35)'}}>
                <Typography variant='h3' sx={{ mb: 1, fontSize: {xs: '2.5rem', md:'3.13rem'} }}>What is prayer?</Typography>
                <Typography variant='body1' sx={{ fontSize: { xs: '1.2rem', md: '1.6rem'} }}> test</Typography>
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export { UnderstandingPrayer };
