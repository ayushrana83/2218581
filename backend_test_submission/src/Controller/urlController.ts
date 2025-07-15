import { Request, Response } from "express";
import { nanoid } from 'nanoid';
import ShortUrl from "../Model/urlModel";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/shorturls`;



export const shortenUrlController = async (req: Request, res: Response) => {
  const { originalUrl, shortCode } = req.body;
  console.log("3");
  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }
  
  console.log("4");
  let customCode = shortCode || nanoid(6).toLowerCase();
  
  
  const existing = await ShortUrl.findOne({ shortCode: customCode });
  if (existing) {
    return res.status(409).json({ message: "Short code already in use" });
  }
  
  console.log("5");
  const shortUrl = `${BASE_URL}/${customCode}`;
  
  const newUrl = new ShortUrl({ originalUrl, shortCode: customCode, shortUrl });
  await newUrl.save();
  
  console.log("7");
  return res.status(201).json({ shortUrl });
};


export const getOriginalUrlController = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    const found = await ShortUrl.findOne({ shortCode });

    if (!found) return res.status(404).json("Short URL not found");

    if (new Date() > found.expiresAt) {
      await ShortUrl.deleteOne({ _id: found._id });
      return res.status(410).json("Short URL has expired");
    }
    console.log(found);
    res.redirect(found.originalUrl)
    return res.status(200).json({found});
  } catch (err) {
    return res.status(500).json({message : "error" , err});
  }
};
