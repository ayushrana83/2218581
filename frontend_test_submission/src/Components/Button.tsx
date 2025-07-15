import Button from '@mui/material/Button';

interface typeMessage {
    msg : string;
}

export default function Buttons({msg = ""} : typeMessage) {
  return (
    <Button variant="contained" disableElevation>
      {msg}
    </Button>
  );
}
