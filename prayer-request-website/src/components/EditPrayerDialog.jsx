import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

function EditPrayerDialog({ onOpen, onClose, prayer, onUpdateField, onSubmit }) {
  return (
    <Dialog open={onOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Prayer Request</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Title"
            value={prayer?.title || ''}
            onChange={(e) => onUpdateField('title', e.target.value)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={prayer?.description || ''}
            onChange={(e) => onUpdateField('description', e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={{ borderRadius: 2, px: 4 }}>
          Update Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditPrayerDialog.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  prayer: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export { EditPrayerDialog };
