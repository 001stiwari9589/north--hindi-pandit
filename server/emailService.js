import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();


// Create reusable transporter strictly from environment variables (Zero hardcoded secrets)
const createTransporter = (port = 465) => {
  const user = (process.env.EMAIL_USER || '001stiwari9589@gmail.com').trim();
  let pass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');

  if (!pass) {
    console.warn('[EMAIL SERVICE] Warning: EMAIL_PASS environment variable is not configured. Email alerts will be skipped safely.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: port,
    secure: port === 465,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 4500,
    greetingTimeout: 4500,
    socketTimeout: 7000
  });
};

/**
 * Send Instant Email Alert for Puja Booking
 */
export async function sendEmailNotification({ bookingId, devoteeName, phoneNumber, pujaName, pujaDate, cityArea, notes }) {
  const user = process.env.EMAIL_USER || '001stiwari9589@gmail.com';
  
  // Guaranteed dual dispatch: ensure BOTH client and admin emails are ALWAYS included by default
  const defaultRecipients = ['001stiwari9589@gmail.com', 'northhindipandit.hyd80@gmail.com'];
  const envRecipients = (process.env.NOTIFICATION_EMAIL || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  const recipientEmails = Array.from(new Set([...defaultRecipients, ...envRecipients]));

  console.log(`\n========================================`);
  console.log(`[EMAIL NOTIFICATION ENGINE] Processing Dual Alert`);
  console.log(`Devotee: ${devoteeName} | Phone: ${phoneNumber} | Puja: ${pujaName} | ID: ${bookingId}`);
  console.log(`Guaranteed Recipients: ${recipientEmails.join(', ')}`);
  console.log(`========================================\n`);

  const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const emailHtml = `
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
          <tr style="border-bottom: 1px solid #F0E6D2;">
            <td style="padding: 10px 0; color: #666;">📝 Notes:</td>
            <td style="padding: 10px 0; color: #333;">${notes || 'None'}</td>
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
  `;

  const emailText = `Namaste!\n\nNayi Puja Booking Request Prapt Hui Hai:\n- Yajman (Name): ${devoteeName}\n- Mobile Number: +91 ${cleanPhone}\n- Puja Name: ${pujaName}\n- Preferred Date: ${pujaDate || 'As per Shubh Muhurat'}\n- Location: ${cityArea || 'Local Area'}\n- Booking ID: ${bookingId}\n- Notes: ${notes || 'None'}\n\nDirect Call: tel:+91${cleanPhone}\nWhatsApp: https://wa.me/91${cleanPhone}\n\nNorth Hindi Pandit - Automated Vedic Booking Dispatch System`;

  // Try direct SMTP with Gmail First (Port 465 SSL, then Port 587 TLS fallback)
  for (const port of [465, 587]) {
    try {
      const transporter = createTransporter(port);
      if (!transporter) {
        return { success: false, error: 'Gmail credentials not configured' };
      }
      const dispatchPromises = recipientEmails.map(async (targetEmail) => {
        const mailOptions = {
          from: `"North Hindi Pandit" <${user}>`,
          to: targetEmail,
          replyTo: user,
          subject: `🔔 Nayi Puja Booking: ${devoteeName} - ${pujaName} (${bookingId})`,
          text: emailText,
          html: emailHtml,
          headers: {
            'X-Priority': '1 (Highest)',
            'X-MSMail-Priority': 'High',
            'Importance': 'High'
          }
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`[SMTP SUCCESS (Port ${port})] Direct alert delivered to: ${targetEmail} | MessageId: ${info.messageId}`);
        return { email: targetEmail, success: true, messageId: info.messageId };
      });

      const settledResults = await Promise.allSettled(dispatchPromises);
      const successfulSends = settledResults.filter(r => r.status === 'fulfilled' && r.value.success);

      if (successfulSends.length > 0) {
        console.log(`[EMAIL SUCCESS] Dispatched to ${successfulSends.length}/${recipientEmails.length} recipients via Gmail SMTP (Port ${port}).`);
        return { success: true, method: 'gmail-smtp', port: port, results: settledResults };
      }
    } catch (smtpErr) {
      console.error(`[EMAIL SMTP ERROR on Port ${port}]: ${smtpErr.message}`);
    }
  }

  // If both ports fail, log and return error (FormSubmit plain table removed so only colorful emails are ever sent)
  console.error(`[EMAIL DISPATCH FAILURE] Could not deliver email via Gmail SMTP on ports 465 and 587.`);
  return { success: false, error: 'Gmail SMTP dispatch failed on all ports' };
}
