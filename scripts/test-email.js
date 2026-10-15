import { sendEmailNotification } from '../server/emailService.js';

async function test() {
  console.log("Testing email notification to both recipients...");
  const result = await sendEmailNotification({
    bookingId: 'TEST-' + Math.floor(100000 + Math.random() * 900000),
    devoteeName: 'Test Devotee (Verification)',
    phoneNumber: '9876543210',
    pujaName: 'Grihapravesh & Vastu Puja',
    pujaDate: '2026-10-15',
    cityArea: 'Gachibowli, Hyderabad',
    notes: 'Testing dual email delivery to 001stiwari9589@gmail.com and Prashant.apn80@gmail.com'
  });
  console.log("Result:", result);
}

test();
