const crypto = require('crypto');
const { sendEmail } = require('./send-email');

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { email, caseStudy } = body || {};

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Build HMAC-signed token (expires 7 days)
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ email, caseStudy: caseStudy || 'Portfolio', expiry });
  const secret = process.env.APPROVAL_SECRET || 'change-this-secret-in-vercel';
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(payload).toString('base64url') + '.' + sig;

  const siteUrl = process.env.SITE_URL || 'https://umangagarwal.in';
  const approvalUrl = `${siteUrl}/api/approve-access?token=${encodeURIComponent(token)}`;

  const notifyEmail = process.env.NOTIFY_EMAIL || 'me@umangagarwal.in';

  console.error('Hello This is done');

  const result = await sendEmail({
    to: notifyEmail,
    subject: `Access Request — ${caseStudy || 'Portfolio'} · ${email}`,
    html: notificationTemplate({ email, caseStudy: caseStudy || 'Portfolio', approvalUrl }),
    replyTo: email,
  });

  if (!result.success) {
    console.error('[request-access] email failed:', result.error);
    return res.status(500).json({ error: 'Failed to send request. Please try again.' });
  }

  // Send confirmation to visitor (best-effort — don't fail the request if this bounces)
  await sendEmail({
    to: email,
    subject: 'Request Received — Umang Agarwal Portfolio',
    html: confirmationTemplate({ email, caseStudy: caseStudy || 'Portfolio', siteUrl }),
    replyTo: notifyEmail,
  }).catch((err) => console.error('[request-access] confirmation email failed:', err));

  return res.status(200).json({ success: true });
};

function confirmationTemplate({ caseStudy, siteUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
        <tr>
          <td style="padding:32px 36px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <span style="font-size:11px;letter-spacing:0.15em;color:#666;text-transform:uppercase;">umangagarwal.in</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#f0ede8;">Request Received</h1>
            <p style="margin:0 0 28px;font-size:14px;color:#888;">
              Your request to access <strong style="color:#f0ede8;">${caseStudy}</strong> has been received.
              I'll review it and send the password to your email once approved — usually within a day.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:6px;margin-bottom:28px;padding:20px;">
              <tr><td>
                <p style="margin:0;font-size:13px;color:#888;line-height:1.7;">
                  <strong style="color:#f0ede8;">Important:</strong> The password email may land in your
                  <strong style="color:#f0ede8;">spam or promotions folder</strong>. Please check there if you
                  don't see it in your inbox within 24 hours.
                </p>
              </td></tr>
            </table>

            <a href="${siteUrl}" style="display:inline-block;background:#f0ede8;color:#111;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:0.05em;">
              VIEW PORTFOLIO →
            </a>

            <p style="margin:28px 0 0;font-size:12px;color:#555;line-height:1.6;">
              Questions? Reach out at <a href="mailto:me@umangagarwal.in" style="color:#888;">me@umangagarwal.in</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function notificationTemplate({ email, caseStudy, approvalUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:8px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
        <tr>
          <td style="padding:32px 36px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <span style="font-size:11px;letter-spacing:0.15em;color:#666;text-transform:uppercase;">umangagarwal.in</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#f0ede8;">Access Request</h1>
            <p style="margin:0 0 28px;font-size:14px;color:#888;">Someone wants to view a protected case study on your portfolio.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:6px;margin-bottom:28px;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#555;margin-bottom:4px;">Visitor Email</div>
                  <div style="font-size:15px;font-weight:600;color:#f0ede8;">${email}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;">
                  <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#555;margin-bottom:4px;">Case Study</div>
                  <div style="font-size:15px;font-weight:600;color:#f0ede8;">${caseStudy}</div>
                </td>
              </tr>
            </table>

            <a href="${approvalUrl}" style="display:inline-block;background:#f0ede8;color:#111;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:0.05em;">
              ✓ &nbsp;APPROVE REQUEST
            </a>

            <p style="margin:28px 0 0;font-size:12px;color:#555;line-height:1.6;">
              This link expires in 7 days. Clicking it will automatically send the password to ${email}.<br>
              If you don't recognise this request, ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
