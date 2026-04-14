/**
 * Email helper — tries Resend first, falls back to Gmail SMTP via nodemailer.
 */

async function sendEmail({ to, subject, html, replyTo }) {
  // ── 1. Resend ──────────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const from = process.env.EMAIL_FROM || 'Umang Agarwal <onboarding@resend.dev>';
      const body = { from, to: Array.isArray(to) ? to : [to], subject, html };
      if (replyTo) body.reply_to = replyTo;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) return { success: true, provider: 'resend' };
      const err = await res.json().catch(() => ({}));
      console.error('[Resend] error:', err);
    } catch (err) {
      console.error('[Resend] fetch failed:', err.message);
    }
  }

  // ── 2. Gmail SMTP fallback (nodemailer) ────────────────────────
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (gmailUser && gmailPass) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `Umang Agarwal <${gmailUser}>`,
        to,
        subject,
        html,
        ...(replyTo ? { replyTo } : {}),
      });

      return { success: true, provider: 'gmail' };
    } catch (err) {
      console.error('[Gmail] failed:', err.message);
    }
  }

  return { success: false, error: 'No email service configured or both providers failed.' };
}

module.exports = { sendEmail };
