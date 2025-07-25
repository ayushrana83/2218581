import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING!);
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};
