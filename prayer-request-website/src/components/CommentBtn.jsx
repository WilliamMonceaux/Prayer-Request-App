import { Button, Typography } from '@mui/material';

function CommentBtn({ text , amount, expand }) {
  return (
    <>
    <Button
      onClick={expand}
      variant="body2"
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: '2rem',
      }}
    >
      {text}
    </Button>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
            {amount}
        </Typography>
        </>
  );
}

export { CommentBtn };
