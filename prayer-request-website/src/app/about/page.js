import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

export default function AboutPage() {
  // 1.125 Scale (Major Second) - The "Safe & Professional" Scale
  const responsiveTypography = {
    h1: {
      fontSize: { xs: '2.8rem', md: '3.2rem', xl: '3.6rem' },
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: { xs: '2.4rem', md: '2.8rem', xl: '3.1rem' },
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: { xs: '1.6rem', md: '1.8rem', xl: '2.1rem' },
      fontWeight: 600,
    },
  };

  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{ p: { xs: 3, md: 8 }, borderRadius: 6, border: '1px solid #f0f0f0' }}
      >
        <Box component="header" textAlign="center" mb={8}>
          <Typography component="h1" sx={{ ...responsiveTypography.h1, mb: 2 }}>
            About This Project
          </Typography>
          <Typography
            component="p"
            color="text.secondary"
            sx={{ ...responsiveTypography.h5, fontWeight: 400 }}
          >
            Bridging faith and technology through community support.
          </Typography>
        </Box>

        <Divider sx={{ mb: 8, opacity: 0.6 }} aria-hidden="true" />

        <Box component="section" mb={8}>
          <Typography
            component="h2"
            gutterBottom
            sx={{ ...responsiveTypography.h2, color: 'primary.main', mb: 2 }}
          >
            Why I Created This
          </Typography>
          <Typography variant="body1">
            This passion project originally started as a cool idea to create this as a
            project for my Software Engineering bootcamp. During my time in bootcamp, I
            wanted to create something that anyone can use daily to grow in their
            relationship with God. After some time of prayer, the idea came to create
            this website so that others can find community and guidance in their lives.
          </Typography>
        </Box>

        <Box component="section">
          <Typography
            component="h2"
            gutterBottom
            sx={{ ...responsiveTypography.h2, color: 'primary.main', mb: 2 }}
          >
            Goals
          </Typography>
          <Typography variant="body1" paragraph>
            Creating a faith-based community that strives in deeping their relationship
            with God. God calls us to being in community numerous times in the bible. It
            is important for community to lift one another during troubling times, which
            helps gives us strength in knowing that we are not alone and keep ourselves
            faithful to Christ.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
