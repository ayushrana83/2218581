import { useState } from "react";
import TextFields from "./TextField";
import Buttons from "./Button";
import ShortUrlBox from "./ShortUrlBox";
import { Link } from "react-router-dom";

interface URL {
  originalUrl: string;
  duration?: number;
  shortCode?: string;
}

function HomePage() {
  const [url, setUrl] = useState<URL>({
    originalUrl: "",
    duration: undefined,
    shortCode: "",
  });

  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleShorten = async () => {
    if (!url.originalUrl) return alert("Please enter a URL");

    try {
      const res = await fetch("http://localhost:7000/shorturls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(url),
      });

      const data = await res.json();
      if (res.ok) setShortenedUrl(data.shortUrl);
      else alert(data.error || "Error shortening URL");
    } catch (err) {
      console.error("Shortening failed:", err);
      alert("Server error");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Link
        to="/statitics"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          textDecoration: "none",
          padding: "8px 16px",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        Statistics
      </Link>

      <h1 style={{ fontSize: "3rem", color: "black" }}>URL Shortener</h1>

      <div style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
        <TextFields setUrl={setUrl} />
        <div onClick={()=> handleShorten()}>

        <Buttons msg="Shorten" />
        </div>
      </div>

      {shortenedUrl && <ShortUrlBox url={shortenedUrl} />}
    </div>
  );
}

export default HomePage;
