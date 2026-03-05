'use client';
import { HeroArea } from '@/components/HeroArea';
import { PrayerRequestCards } from '@/components/PrayerRequestCards';
import { UnderstandingPrayer } from '@/components/UnderstandingPrayer';
import { Pagination } from '@/components/Pagination';
import { PrayerCategories } from '@/components/PrayerCategories';
import { Typography, Container } from '@mui/material';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <>
        <HeroArea
          heading="Where healing and community is built"
          paragraph="Join a community dedicated to lifting one another up. Share your prayer request and experience the strength of being known and supported"
          button="Create an Account"
        />

        <UnderstandingPrayer />

      <main>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: 'clamp(3.5rem, 5vw + 1.5rem, 4.88rem)',
              textAlign: 'center',
              lineHeight: 1.6,
              textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            Community Prayer Requests
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.4rem', md: '1.6rem', xl: '2rem' },
              textAlign: 'center',
              mb: 4,
              textShadow: '0px 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            Lift others up in prayer. Share your request or pray for someone in need.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              borderBottom: '1px solid #e0e0e0',
              gap: 2,
              pb: 2,
              mb: 4,
            }}
          >
            <PrayerCategories />
          </Box>
        </Container>
        <PrayerRequestCards />
      <Pagination />
      </main>
    </>
  );
}
