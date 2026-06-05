const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, code }) => {
  const isConfigured = 
    process.env.EMAIL_USER && 
    process.env.EMAIL_USER !== 'your-email@gmail.com' && 
    process.env.EMAIL_PASS && 
    process.env.EMAIL_PASS !== 'your_gmail_app_password';

  // Always log to console as a backup and dev support
  console.log('\n====================================================');
  console.log(`✉️  EMAIL OTP TO: ${to}`);
  console.log(`🔑  VERIFICATION CODE: ${code}`);
  console.log('====================================================\n');

  if (!isConfigured) {
    console.log('⚠️  SMTP email sending skipped (credentials are still placeholders in backend/.env).');
    return { success: true, logged: true };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force IPv4 to avoid ENETUNREACH on environments without IPv6 routes (like Render)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Confirm Your edeco Account</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 500px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.02);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #110051 0%, #1e1a4f 100%);
            padding: 32px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
            text-decoration: none;
          }
          .logo-dot {
            color: #6affd9;
          }
          .content {
            padding: 40px 32px;
            color: #334155;
            line-height: 1.6;
          }
          h2 {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 16px;
          }
          p {
            font-size: 14px;
            margin-top: 0;
            margin-bottom: 24px;
          }
          .code-box {
            background-color: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            margin: 32px 0;
          }
          .code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 36px;
            font-weight: 900;
            letter-spacing: 0.25em;
            color: #110051;
            margin-left: 0.25em; /* offset letter spacing to center */
          }
          .footer {
            padding: 24px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            font-weight: 500;
          }
          .footer a {
            color: #64748b;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo">edeco<span class="logo-dot">.</span></span>
          </div>
          <div class="content">
            <h2>Verify your email address</h2>
            <p>Welcome to edeco! We're excited to have you join our college counseling platform. To complete your signup, please use the 6-digit confirmation code below:</p>
            
            <div class="code-box">
              <span class="code">${code}</span>
            </div>
            
            <p style="margin-bottom: 0;">This code is valid for <strong>10 minutes</strong>. If you did not request this code, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            © 2026 edeco Inc. All rights reserved.<br>
            If you need assistance, contact our <a href="mailto:support@edeco.com">support team</a>.
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"edeco" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `[edeco] Verify your email address (${code})`,
    text: `Welcome to edeco! Your 6-digit verification code is: ${code}. It is valid for 10 minutes.`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️  Gmail successfully sent to ${to}: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error('❌  Gmail send error:', error);
    return { success: false, error: error.message };
  }
};

const sendAdminAlert = async ({ studentName, studentPhone, studentEmail, targetExam, query }) => {
  const isConfigured = 
    process.env.EMAIL_USER && 
    process.env.EMAIL_USER !== 'your-email@gmail.com' && 
    process.env.EMAIL_PASS && 
    process.env.EMAIL_PASS !== 'your_gmail_app_password';

  const adminEmail = process.env.ADMIN_EMAIL || 'tanishdogra04@gmail.com';

  console.log('\n====================================================');
  console.log(`🔔  ADMIN ALERT: CALLBACK REQUEST`);
  console.log(`👤  STUDENT: ${studentName}`);
  console.log(`📞  PHONE: ${studentPhone}`);
  console.log(`✉️  EMAIL: ${studentEmail}`);
  console.log(`🎯  EXAM: ${targetExam}`);
  console.log(`💬  QUERY: ${query}`);
  console.log('====================================================\n');

  if (!isConfigured) {
    console.log('⚠️  SMTP email sending skipped for admin alert (credentials not configured).');
    return { success: true, logged: true };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force IPv4 to avoid ENETUNREACH on environments without IPv6 routes (like Render)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Callback Request Received</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 550px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.02);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #110051 0%, #1e1a4f 100%);
            padding: 32px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
            text-decoration: none;
          }
          .logo-dot {
            color: #6affd9;
          }
          .content {
            padding: 40px 32px;
            color: #334155;
            line-height: 1.6;
          }
          h2 {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 8px;
            text-align: center;
          }
          .subtitle {
            font-size: 14px;
            color: #64748b;
            text-align: center;
            margin-bottom: 32px;
          }
          .detail-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 32px;
          }
          .detail-row {
            border-bottom: 1px solid #f1f5f9;
          }
          .detail-label {
            padding: 12px 0;
            font-size: 13px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            width: 120px;
          }
          .detail-value {
            padding: 12px 0;
            font-size: 14px;
            font-weight: 600;
            color: #1e293b;
          }
          .detail-value a {
            color: #110051;
            text-decoration: none;
          }
          .footer {
            padding: 24px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo">edeco<span class="logo-dot">.</span></span>
          </div>
          <div class="content">
            <h2>New Callback Request</h2>
            <div class="subtitle">A student has submitted a new inquiry via the portal</div>
            
            <table class="detail-table">
              <tr class="detail-row">
                <td class="detail-label">Student Name</td>
                <td class="detail-value">${studentName}</td>
              </tr>
              <tr class="detail-row">
                <td class="detail-label">Phone Number</td>
                <td class="detail-value"><a href="tel:${studentPhone}">${studentPhone}</a></td>
              </tr>
              <tr class="detail-row">
                <td class="detail-label">Email Address</td>
                <td class="detail-value"><a href="mailto:${studentEmail}">${studentEmail}</a></td>
              </tr>
              <tr class="detail-row">
                <td class="detail-label">Target Exam</td>
                <td class="detail-value">${targetExam || 'General'}</td>
              </tr>
              <tr class="detail-row">
                <td class="detail-label">Source/Query</td>
                <td class="detail-value" style="font-style: italic; color: #475569;">${query || 'N/A'}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            © 2026 edeco Admin Alerts Center. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"edeco Alerts" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🚨 [New Callback] ${studentName} - ${targetExam || 'General Inquiry'}`,
    text: `New Callback Request received:\nName: ${studentName}\nPhone: ${studentPhone}\nEmail: ${studentEmail}\nExam: ${targetExam || 'General'}\nQuery: ${query || 'N/A'}`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️  Gmail Admin Alert successfully sent to ${adminEmail}: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error('❌  Gmail Admin Alert send error:', error);
    return { success: false, error: error.message };
  }
};

sendEmail.sendAdminAlert = sendAdminAlert;
module.exports = sendEmail;
