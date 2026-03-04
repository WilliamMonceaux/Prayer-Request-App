import { Button, Grid } from '@mui/material';

function RequestBtn({ text }) {
  return (
    <>
      {text && (
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
            {text}
          </Button>
        </Grid>
      )}
    </>
  );
}

export { RequestBtn };
