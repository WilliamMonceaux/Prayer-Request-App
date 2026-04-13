import { Avatar, styled } from '@mui/material';
import { gray } from '../lib/theme/customizations/themePrimitives';
import PropTypes from 'prop-types';

const StyledAvatar = styled(Avatar)(({ theme, size }) => ({
  backgroundColor: gray[200],
  color: 'black',
}));


// Displays profile picture if a user has one
// else it will display the first initials of username
function UserAvatar({ user, sx }) {
  const profilePic = user?.profilePicture;
  const initials = user?.username.charAt(0).toUpperCase();

 const userProfile = profilePic || initials

 UserAvatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

  return (
    <StyledAvatar src={profilePic} sx={sx}>
      {userProfile}
    </StyledAvatar>
  );
}

export { UserAvatar };
