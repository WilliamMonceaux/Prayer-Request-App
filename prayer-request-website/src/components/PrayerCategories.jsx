import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
    color: '#555',
    [theme.breakpoints.up('xs')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },
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
        backgroundColor: '#757575',
      },
      '&[value="prayer answered"]': {
        backgroundColor: '#757575',
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