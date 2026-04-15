import { UserAvatar } from './UserAvatar';
import { Box, Typography } from '@mui/material';

function UserHeader({ pic, name }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        order: { xs: 2, sm: 1 },
        minWidth: 0,
      }}
    >
        
      <UserAvatar
    // profile picture / initial 
        user={pic}
        sx={{
          width: { xs: 40, md: 52, xl: 64 },
          height: { xs: 40, md: 52, xl: 64 },
        }}
      />
      {/* Username */}
      <Typography
        variant="body2"
        noWrap
        sx={{
          fontWeight: 600,
          maxWidth: { xs: '18rem', sm: '25rem', md: '40rem' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export { UserHeader };
