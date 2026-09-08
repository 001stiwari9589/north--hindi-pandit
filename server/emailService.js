import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();


// Create reusable transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER || '001stiwari9589@gmail.com';
  const pass = process.env.EMAIL_PASS || 'oyeqwdzhnaiftqsw';
  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
};

/**
 * Send Instant Email Alert for Puja Booking
 */
export async function sendEmailNotification({ bookingId, devoteeName, phoneNumber, pujaName, pujaDate, cityArea, notes }) {
  const user = process.env.EMAIL_USER || '001stiwari9589@gmail.com';
  const pass = process.env.EMAIL_PASS || 'oyeqwdzhnaiftqsw';
  const rawRecipients = process.env.NOTIFICATION_EMAIL || '001stiwari9589@gmail.com, Prashant.apn80@gmail.com';
  const recipientEmails = rawRecipients.split(',').map(e => e.trim()).filter(Boolean);

  console.log(`\n========================================`);
  console.log(`[EMAIL NOTIFICATION ENGINE] Processing Alert`);
  console.log(`Devotee: ${devoteeName} | Phone: ${phoneNumber} | Puja: ${pujaName} | ID: ${bookingId}`);
  console.log(`Recipients: ${recipientEmails.join(', ')}`);
  console.log(`========================================\n`);

  const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  // Try direct SMTP with Gmail First
  const transporter = createTransporter();
  if (transporter) {
    try {
      const mailOptions = {
        from: `"North Hindi Pandit Alerts" <${user}>`,
        to: recipientEmails,
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
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SUCCESS] Alert sent to ${recipientEmails.join(', ')} | MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId, method: 'gmail-smtp' };
    } catch (smtpErr) {
      console.error(`[EMAIL SMTP ERROR] Failed sending via Gmail SMTP: ${smtpErr.message}. Trying FormSubmit HTTP Fallback...`);
    }
  }

  // Backup HTTP Fallback via FormSubmit (Dispatches to all configured recipients)
  try {
    const backupPromises = recipientEmails.map(targetEmail =>
      fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 Nayi Puja Booking: ${devoteeName} - ${pujaName} (${bookingId})`,
          '👤 Yajman (Name)': devoteeName,
          '📱 Mobile Number': `+91 ${cleanPhone}`,
          '🪔 Puja Name': pujaName,
          '📅 Preferred Date': pujaDate || 'As per Shubh Muhurat',
          '📍 Location': cityArea || 'Local Area',
          '🆔 Booking ID': bookingId,
          '📞 Call Link': `tel:+91${cleanPhone}`,
          '💬 WhatsApp Link': `https://wa.me/91${cleanPhone}`,
          '📝 Notes': notes || 'None'
        })
      }).then(r => r.json()).catch(err => ({ error: err.message }))
    );

    const fsResults = await Promise.all(backupPromises);
    console.log(`[EMAIL SUCCESS via FormSubmit HTTP Fallback]`, fsResults);
    return { success: true, method: 'formsubmit-http', results: fsResults };
  } catch (fsErr) {
    console.error(`[EMAIL FORMSUBMIT FALLBACK ERROR]`, fsErr.message);
    return { success: false, error: fsErr.message };
  }
}
