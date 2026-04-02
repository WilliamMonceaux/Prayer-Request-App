import { Avatar, styled } from '@mui/material';
import { gray } from '../lib/theme/customizations/themePrimitives';

const StyledAvatar = styled(Avatar)(({ theme, size }) => ({
  backgroundColor: gray[200],
  color: theme.palette.light,
  fontWeight: 'bold',
}));

function UserAvatar({ user, size, sx }) {
  const initials = user?.username
    ? user.username.charAt(0).toUpperCase()
    : user?.name?.charAt(0) || 'W';

  return (
    <StyledAvatar src={user?.profilePicture} size={size} sx={sx}>
      {initials}
    </StyledAvatar>
  );
}

export { UserAvatar };
