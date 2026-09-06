import fs from 'fs';
import { connectDB, Booking, Inquiry } from './db.js';

async function sync() {
  await connectDB();

  try {
    const bookings = JSON.parse(fs.readFileSync('./server/data/bookings.json', 'utf8') || '[]');
    for (const item of bookings) {
      await Booking.findOneAndUpdate(
        { bookingId: item.bookingId },
        item,
        { upsert: true, returnDocument: 'after' }
      );
    }

    const inquiries = JSON.parse(fs.readFileSync('./server/data/inquiries.json', 'utf8') || '[]');
    for (const item of inquiries) {
      await Inquiry.findOneAndUpdate(
        { inquiryId: item.id || item.inquiryId },
        {
          inquiryId: item.id || item.inquiryId,
          name: item.name,
          phone: item.phone,
          preferredPuja: item.preferredPuja,
          message: item.message,
          createdAt: item.createdAt
        },
        { upsert: true, returnDocument: 'after' }
      );
    }

    const bCount = await Booking.countDocuments();
    const iCount = await Inquiry.countDocuments();
    console.log(`[MongoDB Sync Success] Bookings in DB: ${bCount}, Inquiries in DB: ${iCount}`);
  } catch (err) {
    console.error('[MongoDB Sync Error]', err.message);
  } finally {
    process.exit(0);
  }
}

sync();
