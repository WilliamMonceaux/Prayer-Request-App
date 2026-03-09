import { Button, Grid } from '@mui/material';
import Arrow from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { useSearchParams } from 'next/navigation';
import { Alert } from '@mui/material';

function RequestBtn({ text }) {
  const { currentUser } = useUserContext();
  const router = useRouter();
  const handleRequestClick = () => {
    if (!currentUser) {
      const message = encodeURIComponent('You must sign in first before submitting a prayer request.');
      router.push(`/signin?message=${message}`);
    } else {
      router.push('/request');
    }
  }

  return (
    <>
      {text && (
        <Grid item sx={{ my: 4 }}>
          <Button
          onClick={handleRequestClick}
            variant="contained"
            sx={{
              fontSize: { md: '1.4rem', xl: '1.6rem' },
              fontWeight: 500,
              p: '1.2rem',
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976d2',
                boxShadow: 'none',
              },
              width: { xs: '20rem', md: '30rem' },
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
