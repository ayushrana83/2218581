import dotenv from "dotenv"
dotenv.config();

interface LogInputType {
  stack: "backend" | "frontend";
  level: "debug" | "info" | "warn" | "error" | "fatal";
  package: string;
  message: string;
}

export default async function Log({
  stack,
  level,
  package: pkg,
  message,
}: LogInputType) {
  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(
      process.env.URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: JSON.stringify(logData),
      }
    );

    const result = await response.json();
    console.log("Log success:", result.message);
  } catch (error) {
    console.error("Log failed:", error);
  }
}
