import { Typography, styled, Box, Select, MenuItem } from '@mui/material';
import { green, red } from '../lib/theme/customizations/themePrimitives';
import { PropTypes } from 'prop-types';

const StyledBadge = styled(Box, {
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

function StatusBadge({ status, onStatusChange, isAuthor, sx }) {
  return (
      <StyledBadge status={status} sx={sx}>

        <Typography
          variant="body2"
          component="span"
          sx={{ fontWeight: 'bold', mr: 0.5, color: 'inherit' }}
        >
          Status:
        </Typography>

        {isAuthor ? (
          <Select
            value={status}
            onChange={onStatusChange}
            variant="standard"
            disableUnderline
            sx={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
              typography: 'body2',
              fontWeight: 500,
              color: 'black',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <MenuItem value="Need Prayers">Need Prayers</MenuItem>
            <MenuItem value="Prayer Answered">Prayer Answered</MenuItem>
          </Select>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: 'black',
              fontWeight: 500,
            }}
          >
            {status}
          </Typography>
        )}
      </StyledBadge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  sx: PropTypes.object,
};

export { StatusBadge };
