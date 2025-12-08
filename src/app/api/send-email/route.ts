import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'info@the-algo.com';
const FROM_EMAIL = 'GovernAtlas <noreply@governatlas.com>';

type EmailType = 'vendor-submission' | 'contact-form' | 'review-submitted';

interface VendorSubmissionData {
  vendorEmail: string;
  vendorName: string;
  companyName: string;
  toolName: string;
  website: string;
  category: string;
  description: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ReviewSubmittedData {
  reviewerEmail: string;
  reviewerName: string;
  toolName: string;
  rating: number;
  title: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body as { type: EmailType; data: unknown };

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    switch (type) {
      case 'vendor-submission':
        return handleVendorSubmission(data as VendorSubmissionData);
      case 'contact-form':
        return handleContactForm(data as ContactFormData);
      case 'review-submitted':
        return handleReviewSubmitted(data as ReviewSubmittedData);
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

async function handleVendorSubmission(data: VendorSubmissionData) {
  const { vendorEmail, vendorName, companyName, toolName, website, category, description } = data;

  // Send confirmation to vendor
  const vendorConfirmation = await resend.emails.send({
    from: FROM_EMAIL,
    to: vendorEmail,
    subject: 'GovernAtlas - Vendor Submission Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">Thank You for Your Submission</h1>
        <p>Dear ${vendorName},</p>
        <p>We have received your vendor submission for <strong>${toolName}</strong>. Our team will review your submission and get back to you within 3-5 business days.</p>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Submission Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tool Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${toolName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Website:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="${website}">${website}</a></td>
          </tr>
        </table>

        <p style="margin-top: 24px;">If you have any questions, please reply to this email or contact us at <a href="mailto:info@the-algo.com">info@the-algo.com</a>.</p>

        <p style="margin-top: 24px;">Best regards,<br>The GovernAtlas Team</p>

        <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">This email was sent from GovernAtlas. Please do not reply directly to this automated message.</p>
      </div>
    `,
  });

  // Send notification to admin
  const adminNotification = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[GovernAtlas] New Vendor Submission: ${toolName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">New Vendor Submission</h1>
        <p>A new vendor has submitted their tool for review.</p>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Vendor Information:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contact Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${vendorName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${vendorEmail}">${vendorEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${companyName}</td>
          </tr>
        </table>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Tool Information:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tool Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${toolName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Website:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="${website}">${website}</a></td>
          </tr>
        </table>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Description:</h3>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${description}</p>

        <p style="margin-top: 24px;"><a href="mailto:${vendorEmail}" style="background: #1e3a5f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reply to Vendor</a></p>
      </div>
    `,
  });

  return NextResponse.json({
    success: true,
    vendorEmailId: vendorConfirmation.data?.id,
    adminEmailId: adminNotification.data?.id
  });
}

async function handleContactForm(data: ContactFormData) {
  const { name, email, subject, message } = data;

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `[GovernAtlas Contact] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">New Contact Form Submission</h1>

        <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${subject}</td>
          </tr>
        </table>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Message:</h3>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>

        <p style="margin-top: 24px;"><a href="mailto:${email}" style="background: #1e3a5f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reply to ${name}</a></p>
      </div>
    `,
  });

  return NextResponse.json({ success: true, emailId: result.data?.id });
}

async function handleReviewSubmitted(data: ReviewSubmittedData) {
  const { reviewerEmail, reviewerName, toolName, rating, title, content } = data;

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[GovernAtlas] New Review: ${toolName} (${rating}/5 stars)`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a5f;">New Review Submitted</h1>
        <p>A new review has been submitted and is pending moderation.</p>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Review Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tool:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${toolName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Rating:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><span style="color: #fbbf24; font-size: 18px;">${stars}</span> (${rating}/5)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Title:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${title}</td>
          </tr>
        </table>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Reviewer:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${reviewerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${reviewerEmail}">${reviewerEmail}</a></td>
          </tr>
        </table>

        <h3 style="color: #1e3a5f; margin-top: 24px;">Review Content:</h3>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${content}</div>

        <p style="margin-top: 24px; color: #666; font-size: 14px;">Please review and moderate this submission in the admin panel.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true, emailId: result.data?.id });
}
