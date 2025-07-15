import mongoose, { Document, Schema } from "mongoose";

export interface ShortUrlType extends Document {
  originalUrl: string;
  shortCode: string;
  expiresAt: Date;
  createdAt: Date;
}

const shortUrlSchema = new Schema<ShortUrlType>({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true },
  expiresAt: { type: Date, default: new Date(Date.now() + 30 * 60 * 1000) },
  createdAt: { type: Date, default: Date.now },
});

const ShortUrl = mongoose.model<ShortUrlType>("ShortUrl", shortUrlSchema);

export default ShortUrl;
