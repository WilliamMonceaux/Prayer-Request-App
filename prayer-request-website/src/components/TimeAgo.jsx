import { formatDistanceToNow } from 'date-fns';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TimeAgo({ createdAt }) {
  return (
    <Typography
      variant="caption"
      sx={{
        fontStyle: 'italic',
      }}
    >
      {formatDistanceToNow(new Date( createdAt ), { addSuffix: true })}
    </Typography>
  );
}

TimeAgo.propTypes = {
    createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
    ]).isRequired,
};

export { TimeAgo };
