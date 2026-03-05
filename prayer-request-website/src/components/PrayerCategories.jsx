import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  backgroundColor: '#f5f5f7',
  borderRadius: '50px',
  padding: '4px',
  border: 'none',
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: '50px',
    padding: '6px 24px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: { xs: '1.2rem', md: '1.6rem', xl: '2.0rem' },
    color: '#555',
   '&.Mui-selected': {
      color: 'white',
      boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
      '&:hover': {
        opacity: 0.9,
      },
      '&[value="all"]': {
        backgroundColor: '#757575',
      },
      '&[value="need prayers"]': {
        backgroundColor: '#fbc02d',
      },
      '&[value="prayer answered"]': {
        backgroundColor: '#81c784',
      },
    },
  },
}));

function PrayerCategories() {
  const [alignment, setAlignment] = useState('all');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="prayer request categories"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="need prayers">Need Prayers</ToggleButton>
      <ToggleButton value="prayer answered">Prayer Answered</ToggleButton>
    </StyledToggleButtonGroup>
  );
}

export { PrayerCategories };