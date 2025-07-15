import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Buttons from "./Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Statitics() {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState<any>(null); // You can type this properly later

  const getStats = async () => {
    if (!code) return alert("Please enter a code");

    try {
      const tempcode = new URL(code).pathname.split("/").pop();
      const res = await fetch(`http://localhost:7000/shorturls/${tempcode}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Not found");
        return;
      }

      setStats(data);
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: "1rem",
      }}
    >
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          textDecoration: "none",
          padding: "12px 14px",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "34px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon />
      </Link>

      <h1 style={{ fontSize: "3rem", color: "black" }}>Statistics</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="outlined-basic"
          label="Short Code"
          variant="standard"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div onClick={getStats}>

        <Buttons msg="Get Details"  />
        </div>
      </div>

      {/* Show Stats if Available */}
      {stats && (
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h6">Original URL: {stats.originalUrl}</Typography>
          <Typography variant="h6">Short Code: {stats.shortCode}</Typography>
          <Typography variant="h6">Clicks: {stats.clicks}</Typography>
          <Typography variant="h6">
            Expires At: {new Date(stats.expiresAt).toLocaleString()}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Statitics;
