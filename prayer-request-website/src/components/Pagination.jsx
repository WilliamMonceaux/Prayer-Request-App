import { Box, IconButton, Typography, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Pagination({ current = 1, total = 25}) {
    return(
<Box 
      className="pagination-wrapper"
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 4, 
        mb: 2 
      }}
    >
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={4}
        sx={{
          border: '1px solid #e0e0e0',
          padding: '12px 24px',
          borderRadius: '1rem',
          backgroundColor: 'white'
        }}
      >
        <IconButton aria-label="previous page">
          <ArrowBackIosNewIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
        </IconButton>

        <Typography 
          variant="body1"
          sx={{ 
            fontWeight: 500,
            fontSize: 'clamp(1rem, 1vw + 0.75rem, 1.25rem)',
            userSelect: 'none' 
          }}
        >
          {current} out of {total}
        </Typography>

        <IconButton aria-label="next page">
          <ArrowForwardIosIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
        </IconButton>
      </Stack>
    </Box>
    );
}

export { Pagination };