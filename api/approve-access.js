const crypto = require('crypto');
const { sendEmail } = require('./send-email');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');

  const { token } = req.query;
  if (!token) return res.status(400).send(errorPage('Missing approval token.'));

  // Verify HMAC token
  let payload;
  try {
    const decoded = decodeURIComponent(token);
    const dotIdx = decoded.lastIndexOf('.');
    if (dotIdx === -1) throw new Error('malformed');

    const encodedPayload = decoded.slice(0, dotIdx);
    const sig = decoded.slice(dotIdx + 1);
    const raw = Buffer.from(encodedPayload, 'base64url').toString('utf8');

    const secret = process.env.APPROVAL_SECRET || 'change-this-secret-in-vercel';
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');

    if (sig !== expected) return res.status(400).send(errorPage('Invalid or tampered approval link.'));

    payload = JSON.parse(raw);

    if (Date.now() > payload.expiry) {
      return res.status(400).send(errorPage('This approval link has expired (7-day limit). Ask the visitor to request access again.'));
    }
  } catch {
    return res.status(400).send(errorPage('Invalid approval link.'));
  }

  const { email, caseStudy } = payload;
  const password = process.env.CASE_STUDY_PASSWORD || 'OPENWORK11';
  const siteUrl = process.env.SITE_URL || 'https://umangagarwal.in';

  const result = await sendEmail({
    to: email,
    subject: 'Access Granted — Umang Agarwal Portfolio',
    html: passwordTemplate({ email, caseStudy, password, siteUrl }),
    replyTo: process.env.NOTIFY_EMAIL || 'me@umangagarwal.in',
  });

  if (!result.success) {
    return res.status(500).send(errorPage(`Approval recorded but failed to email the visitor (${email}). Check server logs.`));
  }

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(successPage({ email, caseStudy }));
};

function passwordTemplate({ caseStudy, password, siteUrl }) {
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
            <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#f0ede8;">Access Granted ✓</h1>
            <p style="margin:0 0 28px;font-size:14px;color:#888;">Your request to view <strong style="color:#f0ede8;">${caseStudy}</strong> has been approved.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:6px;margin-bottom:28px;text-align:center;">
              <tr>
                <td style="padding:28px 20px;">
                  <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#555;margin-bottom:10px;">Your Password</div>
                  <div style="font-size:30px;font-weight:700;color:#f0ede8;letter-spacing:0.15em;font-family:'Courier New',monospace;">${password}</div>
                </td>
              </tr>
            </table>

            <a href="${siteUrl}" style="display:inline-block;background:#f0ede8;color:#111;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:13px;font-weight:700;letter-spacing:0.05em;">
              VIEW PORTFOLIO →
            </a>

            <p style="margin:28px 0 0;font-size:12px;color:#555;line-height:1.6;">
              Use this password to unlock the case studies on my portfolio.<br>
              Feel free to reach out at <a href="mailto:me@umangagarwal.in" style="color:#888;">me@umangagarwal.in</a> with any questions.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function successPage({ email, caseStudy }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="refresh" content="5;url=https://umangagarwal.in">
  <title>Approved</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#f0ede8;display:flex;align-items:center;justify-content:center;min-height:100vh;}
    .card{text-align:center;padding:48px 40px;max-width:420px;}
    .icon{font-size:44px;margin-bottom:20px;}
    h1{font-size:24px;font-weight:700;margin-bottom:8px;}
    p{font-size:14px;color:#888;line-height:1.6;}
    strong{color:#f0ede8;}
    .redirect{font-size:12px;color:#555;margin-top:20px;}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Request Approved</h1>
    <p>Password sent to <strong>${email}</strong>.<br>They can now access <strong>${caseStudy}</strong>.</p>
    <p class="redirect">Redirecting you home in 5 seconds…</p>
  </div>
</body>
</html>`;
}

function errorPage(message) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Error</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#f0ede8;display:flex;align-items:center;justify-content:center;min-height:100vh;}
    .card{text-align:center;padding:48px 40px;max-width:420px;}
    h1{font-size:20px;font-weight:700;color:#ef4444;margin-bottom:12px;}
    p{font-size:14px;color:#888;line-height:1.6;}
  </style>
</head>
<body>
  <div class="card">
    <h1>Something went wrong</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
