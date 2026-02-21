'use client';
import { Box, Container, Grid } from '@mui/material';
import { PrayerHero } from './PrayerHero';
import { PrayerInfoCard } from './PrayerInfoCard';

function UnderstandingPrayer() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', my: 20 }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', width: '100%', p: 0 }}>
        <Grid container sx={{ flexGrow: 1, width: '100%', justifyContent: 'center' }}>
          
          <PrayerHero />

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
            }}
          >
            <PrayerInfoCard 
              title="What is prayer?" 
              description="Prayer is a solemn request for help or expression of faith." 
            />
            <PrayerInfoCard 
              title="Why is it important?" 
              description="It builds community and provides strength during difficult times." 
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
export { UnderstandingPrayer };
