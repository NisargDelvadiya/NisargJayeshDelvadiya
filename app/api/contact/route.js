import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiter to prevent spam bots
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 3; // Maximum 3 emails per minute per IP

export async function POST(request) {
  try {
    // 1. IP-Based Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown_ip';
    const currentTime = Date.now();
    
    if (rateLimitMap.has(ip)) {
      const rateData = rateLimitMap.get(ip);
      if (currentTime - rateData.startTime < RATE_LIMIT_WINDOW_MS) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many requests. Please wait a minute before sending another message.' },
            { status: 429 } // 429 Too Many Requests
          );
        }
        rateData.count += 1;
      } else {
        // Reset window for this IP
        rateLimitMap.set(ip, { count: 1, startTime: currentTime });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    }

    // Basic garbage collection to prevent memory leaks if thousands of unique IPs hit the server
    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
    }

    // 2. Process Email Submission
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (email, subject, message) are required.' },
        { status: 400 }
      );
    }

    const zohoEmail = process.env.ZOHO_EMAIL;
    const zohoPassword = process.env.ZOHO_PASSWORD;

    if (!zohoEmail || !zohoPassword) {
      console.error("Missing Zoho SMTP configuration credentials in environment variables.");
      return NextResponse.json(
        { error: 'Server configuration error. Credentials not configured.' },
        { status: 500 }
      );
    }

    // Configure Zoho SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in', // standard SMTP host for Zoho India (.in)
      port: 465,
      secure: true, // true for port 465 (SSL)
      auth: {
        user: zohoEmail,
        pass: zohoPassword
      }
    });

    const mailOptions = {
      from: zohoEmail, // Must be Zoho sender address or authentic credentials
      to: zohoEmail,   // Send email back to yourself
      replyTo: email,  // Clicking reply will write back to the visitor's email
      subject: `NisargJayeshDelvadiya Contact Form: ${subject}`,
      text: `You received a new message from the contact form on NisargJayeshDelvadiya.

From: ${email}
Subject: ${subject}

Message:
----------------------------------------
${message}
----------------------------------------`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e4e8; border-radius: 8px;">
          <h2 style="color: #24292e; border-bottom: 1px solid #e1e4e8; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>From:</strong> <a href="mailto:${email}" title="Go to mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f6f8fa; padding: 15px; border-radius: 6px; border: 1px solid #d1d5da; white-space: pre-wrap; font-family: monospace;">${message}</div>
          <footer style="margin-top: 20px; font-size: 12px; color: #586069; border-top: 1px solid #e1e4e8; padding-top: 10px;">
            Sent from NisargJayeshDelvadiya Portfolio
          </footer>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Nodemailer error sending email:", error);
    return NextResponse.json(
      { error: `Failed to send email: ${error.message}` },
      { status: 500 }
    );
  }
}
