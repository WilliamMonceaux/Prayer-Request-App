import { Button as MuiButton, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
 
// SHARED UI PRIMITIVES

export const CustomButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '2rem',
  padding: '1.2rem',
  textTransform: 'none',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
}));

// FUNCTIONAL COMPONENTS

export function RequestBtn({ text }) {
  const { currentUser } = useUserContext();
  const router = useRouter();

  const handleRequestClick = () => {
    if (!currentUser) {
      const message = encodeURIComponent('You must sign in first before submitting a prayer request.');
      router.push(`/signin?message=${message}`);
    } else {
      router.push('/request');
    }
  };

  return (
    <CustomButton
      onClick={handleRequestClick}
      variant="contained"
      sx={{ width: { xs: '20rem', md: '30rem' } }}
    >
      {text}
      <Image
        src="/images/arrow.png"
        alt="Arrow"
        width={32}
        height={24}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </CustomButton>
  );
}
