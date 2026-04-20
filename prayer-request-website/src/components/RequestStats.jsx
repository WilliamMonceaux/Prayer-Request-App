import { Box, Typography } from '@mui/material';

/**
 * Displays a horizontal row of statistics for each prayer request
 * Includes prayer count, comments on post, adn the request duration, and the posted date.
 * @component
 * @param {Object} props - Component props.
 * @param {number|string} props.prayers - The number of times the request has been prayed for.
 * @param {number|string} props.comments - The total number of comments/encouragements.
 * @param {string} props.duration - How long the prayer request remains active (e.g., '1 Week').
 * @param {string} props.posted - The formatted date string of when the request was created.
 * @returns {React.JSX.Element} A flexible box containing themed typography stats.
 */

function RequestStats({ prayers, comments, duration, posted }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 2, md: 5 },
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
          fontWeight: 'bold',
        }}
      >
        Prayers: {prayers}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
          fontWeight: 'bold',
        }}
      >
        Comments: {comments}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
        }}
      >
        Duration: {duration}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
        }}
      >
        Posted: {posted}
      </Typography>
    </Box>
  );
}

export { RequestStats };
