import { Button, Grid } from '@mui/material';
import Arrow from 'next/image';
import Link from 'next/link';

function RequestBtn({ text }) {
  return (
    <>
      {text && (
        <Grid item sx={{ my: 4 }}>
          <Button
          component={Link}
          href='/request'
            variant="contained"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem', xl: '1.6rem' },
              fontWeight: 500,
              p: '1.2rem',
              backgroundColor: '#2196F3',
              width: { xs: '200px', md: '300px' },
              borderRadius: 6,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {text}
            <Arrow
              src="/images/arrow.png"
              alt="Arrow"
              width={32}
              height={24}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Button>
        </Grid>
      )}
    </>
  );
}

export { RequestBtn };
