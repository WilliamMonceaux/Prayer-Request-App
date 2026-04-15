import { IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

function EditBtn({ editToggle }) {
  return (
    <IconButton
      size="small"
      onClick={editToggle}
      sx={{
        color: 'grey.400',
        '&:hover': { color: 'primary.main' },
      }}
    >
      <EditIcon fontSize="medium" />
    </IconButton>
  );
}

export { EditBtn };
