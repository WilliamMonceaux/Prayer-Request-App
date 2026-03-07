'use client';
import { Box, Container, Grid } from '@mui/material';
import { PrayerHero } from './PrayerHero';
import { PrayerInfoCard } from './PrayerInfoCard';

function UnderstandingPrayer() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', my: 20 }}>
      <Container
        maxWidth="lg"
        sx={{ flexGrow: 1, display: 'flex', width: '100%', p: 0 }}
      >
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
              description='"For me, prayer is a surge of the heart; it is a simple look turned toward heaven, it is a cry of recognition and of love, embracing both trial and joy."'
              quote=' - Saint Therese of Lisieux'
              image={
                <Box
                  component="img"
                  src="/images/open-hands.png"
                  alt="open-hands"
                  sx={{
                    height: { xs: 50, md: 80, xl: 100 },
                    width: 'auto',
                    objectFit: 'contain',
                    mb: 1,
                  }}
                />
              }
            />
            <PrayerInfoCard
              title="Why is it important?"
              description="As stated in James 5:16, it is important to pray for others so that they may find healing a mist their trials. It helps draw our focus back to God and the peace he gives."
              image={
                 <Box
                  component="img"
                  src="/images/community.png"
                  alt="community"
                  sx={{
                    height: { xs: 50, md: 80, xl: 100 },
                    width: 'auto',
                    objectFit: 'contain',
                    mb: 1,
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export { UnderstandingPrayer };
