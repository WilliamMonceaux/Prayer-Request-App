import { Button as MuiButton, Box, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
import { green, red, brand } from '../lib/theme/customizations/themePrimitives';

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

export const StatusBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '8px',
  border: '1px solid',
  fontWeight: 700,
  fontSize: '0.875rem',
  backgroundColor: status === 'Prayer Answered' ? green[50] : red[50],
  borderColor: status === 'Prayer Answered' ? green[200] : red[200],
  color: status === 'Prayer Answered' ? green[800] : red[800],
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(1, 3),
    fontSize: '1.1rem',
  },
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
