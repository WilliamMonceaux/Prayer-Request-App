'use client';
import { Box, Container, Grid } from '@mui/material';
import { PrayerHero } from './PrayerHero';
import { PrayerInfoCard } from './PrayerInfoCard';

function UnderstandingPrayer() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', my: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" wrap="nowrap">
          <Grid item xs={12} md={5}>
            <PrayerHero />
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: 3,
              }}
            >
              <PrayerInfoCard
                title="What is prayer?"
                description='"For me, prayer is a surge of the heart; it is a simple look turned toward heaven, it is a cry of recognition and of love, embracing both trial and joy." - Saint Therese of Lisieux'
              />
              <PrayerInfoCard
                title="Why is it important?"
                description="Find peace, healing & support"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export { UnderstandingPrayer };
