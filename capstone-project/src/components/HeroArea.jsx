import { Box } from '@mui/material';

function HeroArea() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '60vh',
        background: 'linear-gradient(to bottom, #43E97B, #38F9D7)',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 'stretch',
          backgroundColor: '#f5f5f5',
          p: '10rem',
          width: '70%',
        }}
      >
      </Box>
    </Box>
  );
}

export { HeroArea };
