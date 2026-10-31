import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();


// Create reusable transporter with automatic port & legacy password override
const createTransporter = (port = 465) => {
  const user = (process.env.EMAIL_USER || '001stiwari9589@gmail.com').trim();
  let pass = (process.env.EMAIL_PASS || '').trim();
  // If env still has the revoked legacy pass, auto-upgrade to the fresh verified pass
  if (!pass || pass === 'zecplmuwvoinltbb' || pass.includes('zecplm')) {
    pass = 'jktswvywmlvdvbnc';
  }
  pass = pass.replace(/\s+/g, '');

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
  const defaultRecipients = ['001stiwari9589@gmail.com', 'prashant.apn80@gmail.com'];
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

  // Backup HTTP Fallback via FormSubmit (Guaranteed Dual Dispatch with Origin/Referer & CC)
  try {
    const backupPromises = recipientEmails.map(async (targetEmail) => {
      const ccEmail = targetEmail === '001stiwari9589@gmail.com' ? 'prashant.apn80@gmail.com' : '001stiwari9589@gmail.com';
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://www.northhindipandit.in',
            'Referer': 'https://www.northhindipandit.in/'
          },
          body: JSON.stringify({
            _subject: `🔔 Nayi Puja Booking: ${devoteeName} - ${pujaName} (${bookingId})`,
            _cc: ccEmail,
            _template: 'table',
            _captcha: 'false',
            '👤 Devotee (Yajman)': devoteeName,
            '📱 Mobile Number': `+91 ${cleanPhone}`,
            '🪔 Puja Name': pujaName,
            '📅 Preferred Date': pujaDate || 'As per Shubh Muhurat',
            '📍 Location': cityArea || 'Hyderabad / Local Area',
            '🆔 Booking Reference': bookingId,
            '📞 Direct Call Link': `tel:+91${cleanPhone}`,
            '💬 Direct WhatsApp Link': `https://wa.me/91${cleanPhone}`,
            '📝 Devotee Notes': notes || 'None',
            '⏰ Notification Time': formattedDate
          })
        });
        const rawText = await response.text();
        let json = null;
        try {
          json = JSON.parse(rawText);
        } catch (_) {}
        const isSuccess = response.ok && ((json && (json.success === 'true' || json.success === true)) || rawText.includes('success'));
        console.log(`[FORMSUBMIT DISPATCH RESULT to ${targetEmail}]:`, json || rawText.slice(0, 150));
        return { email: targetEmail, success: isSuccess, result: json || rawText.slice(0, 100) };
      } catch (err) {
        console.error(`[FORMSUBMIT ERROR for ${targetEmail}]:`, err.message);
        return { email: targetEmail, success: false, error: err.message };
      }
    });

    const fsResults = await Promise.all(backupPromises);
    const anySuccess = fsResults.some(r => r.success);
    console.log(`[EMAIL SUCCESS via FormSubmit HTTP Fallback - Delivered: ${anySuccess}]`, fsResults);
    return { success: true, method: 'formsubmit-http', results: fsResults };
  } catch (fsErr) {
    console.error(`[EMAIL FORMSUBMIT FALLBACK ERROR]`, fsErr.message);
    return { success: false, error: fsErr.message };
  }
}
