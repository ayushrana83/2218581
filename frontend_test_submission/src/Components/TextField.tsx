import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface URL {
  originalUrl: string;
  duration?: number;
  shortCode?: string;
}

interface TextFieldsProps {
  setUrl: React.Dispatch<React.SetStateAction<URL>>;
}

const TextFields: React.FC<TextFieldsProps> = ({ setUrl }) => {
  const handleChange = (field: keyof URL, value: string) => {
    setUrl((prev) => ({
      ...prev,
      [field]: field === "duration" ? Number(value) : value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px" }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="URL"
        variant="outlined"
        onChange={(e) => handleChange("originalUrl", e.target.value)}
      />
      <TextField
        label="Duration (in minutes)"
        type="number"
        variant="outlined"
        onChange={(e) => handleChange("duration", e.target.value)}
      />
      <TextField
        label="Custom Keyword (optional)"
        variant="outlined"
        onChange={(e) => handleChange("shortCode", e.target.value)}
      />
    </Box>
  );
};

export default TextFields;
