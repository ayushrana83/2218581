import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ShortUrlBoxProps {
  url?: string;
}

function ShortUrlBox({ url = "" }: ShortUrlBoxProps) {
  const handleCopy = async () => {
    try {
      if (url && url.length > 0) {
        await navigator.clipboard.writeText(url);
        alert('Copied to clipboard!');
      }
    } catch (err) {
      alert('Failed to copy');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} sx={{ maxWidth: 600 }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-url">Short URL</InputLabel>
        <OutlinedInput
          id="outlined-url"
          value={url}
          readOnly
          label="Short URL"
          sx={{
            pointerEvents: 'none',
            userSelect: 'none',
            backgroundColor: '#f5f5f5',
          }}
          inputProps={{
            tabIndex: -1,
          }}
        />
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleCopy}
        sx={{ height: '56px' }}
        startIcon={<ContentCopyIcon />}
        disabled={!url}
      >
        Copy
      </Button>
    </Box>
  );
}

export default ShortUrlBox;
