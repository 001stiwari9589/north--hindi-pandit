import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  if (process.env.VERCEL && !process.env.MONGODB_URI) {
    console.log('[MongoDB Notice] Running on Vercel without MONGODB_URI. Using local /tmp storage.');
    isConnected = false;
    return false;
  }
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/north_hindi_pandit';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500 // Fast timeout
    });
    isConnected = true;
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return true;
  } catch (err) {
    isConnected = false;
    console.log(`[MongoDB Notice] Could not connect to MongoDB (${err.message}). Using local JSON storage fallback.`);
    return false;
  }
};

export const getDBStatus = () => isConnected;

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  devoteeName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, default: '' },
  pujaType: { type: String, required: true },
  pujaDate: { type: String, default: 'To be decided' },
  preferredTime: { type: String, default: 'Morning' },
  cityArea: { type: String, default: '' },
  fullAddress: { type: String, default: '' },
  samagriOption: { type: String, default: 'with-samagri' },
  estimatedPrice: { type: Number, default: 2100 },
  notes: { type: String, default: '' },
  status: { type: String, default: 'Pending Confirmation' },
  createdAt: { type: Date, default: Date.now }
});

// Inquiry Schema
const inquirySchema = new mongoose.Schema({
  inquiryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  preferredPuja: { type: String, default: 'General Consultation' },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
