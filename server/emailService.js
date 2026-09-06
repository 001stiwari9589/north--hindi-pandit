import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // 16-character Google App Password
    }
  });
};

/**
 * Send Instant Email Alert for Puja Booking
 */
export async function sendEmailNotification({ bookingId, devoteeName, phoneNumber, pujaName, pujaDate, cityArea, notes }) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  console.log(`\n========================================`);
  console.log(`[EMAIL NOTIFICATION ENGINE] Processing Alert`);
  console.log(`Devotee: ${devoteeName} | Phone: ${phoneNumber} | Puja: ${pujaName} | ID: ${bookingId}`);
  console.log(`========================================\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[EMAIL NOTICE] EMAIL_USER or EMAIL_PASS not yet set in .env. Email notification logged.`);
    return { success: true, method: 'logged_offline', message: 'Credentials not configured' };
  }

  const transporter = createTransporter();
  if (!transporter) return { success: false, message: 'Transporter failed' };

  const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const mailOptions = {
    from: `"North Hindi Pandit" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `🔔 Nayi Puja Booking: ${devoteeName} - ${pujaName} (${bookingId})`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 1.5px solid #D4AF37; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #4A0B16 0%, #2A040C 100%); padding: 22px 24px; text-align: center; color: white;">
          <div style="font-size: 32px; color: #F7DC6F; margin-bottom: 4px;">ॐ</div>
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">North Hindi Pandit</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #F7DC6F;">Nayi Puja Booking Request Prapt Hui Hai!</p>
        </div>

        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666; width: 40%;">👤 Yajman (Name):</td>
              <td style="padding: 10px 0; font-weight: bold; color: #2A040C; font-size: 15px;">${devoteeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666;">📱 Mobile Number:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #B45309; font-size: 15px;">
                <a href="tel:+91${cleanPhone}" style="color: #B45309; text-decoration: none;">+91 ${cleanPhone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666;">🪔 Puja Name:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #2A040C;">${pujaName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666;">📅 Preferred Date:</td>
              <td style="padding: 10px 0; color: #333;">${pujaDate || 'As per Shubh Muhurat'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666;">📍 Location:</td>
              <td style="padding: 10px 0; color: #333;">${cityArea || 'Local Area'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0E6D2;">
              <td style="padding: 10px 0; color: #666;">🆔 Booking Reference:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #9A3412;">${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;">⏰ Received At:</td>
              <td style="padding: 10px 0; color: #666;">${formattedDate}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <a href="tel:+91${cleanPhone}" style="flex: 1; display: block; text-align: center; background: #2A040C; color: white; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              📞 Call Devotee Now
            </a>
            <a href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Namaste ${devoteeName} ji! Aapka booking ID ${bookingId} prapt hua. Hum Shubh Muhurat confirm karne ke liye aapse sampark kar rahe hain.`)}" style="flex: 1; display: block; text-align: center; background: #25D366; color: white; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              💬 WhatsApp Devotee
            </a>
          </div>
        </div>

        <div style="background: #F8F4EC; padding: 12px; text-align: center; font-size: 12px; color: #888;">
          North Hindi Pandit - Automated Vedic Booking Dispatch System
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Alert sent to ${recipientEmail} | MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send email: ${err.message}`);
    return { success: false, error: err.message };
  }
}
