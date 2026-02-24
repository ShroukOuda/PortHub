const nodemailer = require('nodemailer');

let transporter = null;
let etherealAccount = null;

// Create transporter based on environment
const createTransporter = async () => {
    // For production, use your actual SMTP settings
    if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    
    // For development, use Gmail if configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        console.log('📧 Using Gmail for emails');
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }
    
    // Fallback to Ethereal (test service - emails viewable at ethereal.email)
    try {
        etherealAccount = await nodemailer.createTestAccount();
        console.log('📧 Using Ethereal test account for emails');
        console.log('   ⚠️  Emails won\'t arrive in real inbox!');
        console.log('   📬 View emails at: https://ethereal.email/login');
        console.log('   👤 User:', etherealAccount.user);
        console.log('   🔑 Pass:', etherealAccount.pass);
        
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: etherealAccount.user,
                pass: etherealAccount.pass
            }
        });
    } catch (error) {
        console.log('❌ Could not create Ethereal account:', error.message);
        return null;
    }
};

// Initialize transporter
const initializeTransporter = async () => {
    if (!transporter) {
        transporter = await createTransporter();
    }
    return transporter;
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetCode, firstName) => {
    // Initialize transporter if needed
    await initializeTransporter();
    
    // If no transporter available, return failure
    if (!transporter) {
        console.log('❌ No email transporter available');
        return { success: false, error: 'Email service not configured', noTransporter: true };
    }
    
    const mailOptions = {
        from: `"PortHub" <${process.env.GMAIL_USER || 'noreply@porthub.com'}>`,
        to: email,
        subject: 'Password Reset Code - PortHub',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #7c3aed, #432161); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                                🔐 Password Reset
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                Hi <strong>${firstName || 'there'}</strong>,
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                We received a request to reset your password. Use the code below to complete the process:
                            </p>
                            <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
                                <p style="color: #6b21a8; font-size: 14px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">
                                    Your Reset Code
                                </p>
                                <p style="color: #7c3aed; font-size: 36px; font-weight: 700; letter-spacing: 8px; margin: 0; font-family: monospace;">
                                    ${resetCode}
                                </p>
                            </div>
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px;">
                                ⏰ This code will expire in <strong>15 minutes</strong>.
                            </p>
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 30px;">
                                If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                            </p>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                                This email was sent by PortHub. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
        text: `
Hi ${firstName || 'there'},

We received a request to reset your password.

Your password reset code is: ${resetCode}

This code will expire in 15 minutes.

If you didn't request this password reset, please ignore this email.

- PortHub Team
        `
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Password reset email sent:', info.messageId);
        
        // For Ethereal, provide preview URL
        if (info.messageId && transporter.options?.host === 'smtp.ethereal.email') {
            console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
            return { 
                success: true, 
                messageId: info.messageId,
                previewUrl: nodemailer.getTestMessageUrl(info)
            };
        }
        
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send welcome email
const sendWelcomeEmail = async (email, firstName) => {
    await initializeTransporter();
    
    if (!transporter) {
        return { success: false, error: 'Email service not configured' };
    }
    
    const mailOptions = {
        from: `"PortHub" <${process.env.GMAIL_USER || 'noreply@porthub.com'}>`,
        to: email,
        subject: 'Welcome to PortHub! 🎉',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #7c3aed, #432161); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                                Welcome to PortHub! 🎉
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 16px 16px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                                Hi <strong>${firstName}</strong>,
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                                Welcome aboard! We're excited to have you join PortHub. You can now create your professional portfolio and showcase your work to the world.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${process.env.CLIENT_URL || 'http://localhost:4200'}/dashboard" 
                                   style="background: linear-gradient(135deg, #7c3aed, #432161); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                                    Go to Dashboard
                                </a>
                            </div>
                            <p style="color: #666666; font-size: 14px;">
                                If you have any questions, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Welcome email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendPasswordResetEmail,
    sendWelcomeEmail,
    initializeTransporter
};
