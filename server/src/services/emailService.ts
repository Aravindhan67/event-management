import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> => {
  try {
    const host = process.env.EMAIL_HOST || 'smtp.mailtrap.io';
    const port = Number(process.env.EMAIL_PORT) || 2525;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const from = process.env.EMAIL_FROM || 'no-reply@eventpro.com';

    // If SMTP credentials aren't configured or test environment, log mock email
    if (!user || user === 'mock_user') {
      console.log(`\n--- [MOCK EMAIL SENT] ---`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log(`-------------------------\n`);
      return true;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"EventPro Platform" <${from}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error: any) {
    console.error(`[Email Service Error] Failed sending email to ${to}:`, error.message);
    return false;
  }
};

export const sendBookingConfirmationEmail = async (booking: any, event: any) => {
  const subject = `Booking Confirmed: ${event.title} (Ref: ${booking.bookingReference})`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E5EAF0; border-radius: 8px;">
      <h2 style="color: #183153;">Your Event Registration is Confirmed!</h2>
      <p>Hello <strong>${booking.attendeeInfo.fullName}</strong>,</p>
      <p>Thank you for registering for <strong>${event.title}</strong>.</p>
      <div style="background: #F7F9FC; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
        <p><strong>Event Date:</strong> ${event.startDate} at ${event.startTime}</p>
        <p><strong>Location:</strong> ${event.locationType === 'in_person' ? event.venue?.name + ', ' + event.venue?.city : 'Virtual Event'}</p>
        <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
      </div>
      <p>We look forward to seeing you at the event.</p>
      <p style="color: #778397; font-size: 12px; margin-top: 30px;">EventPro Global - Creating Unforgettable Experiences</p>
    </div>
  `;
  return sendEmail({ to: booking.attendeeInfo.email, subject, html });
};
