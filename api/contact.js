import { Resend } from 'resend';
const hits = new Map();
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = (s, n) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  const { RESEND_API_KEY, CONTACT_RECEIVER_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL || !CONTACT_FROM_EMAIL)
    return res.status(500).json({ ok: false, error: 'Mail service is not configured.' });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots
  const ip = String(req.headers['x-forwarded-for'] || 'x').split(',')[0], now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (recent.length >= 3) return res.status(429).json({ ok: false, error: 'Too many messages. Try again later.' });
  const name = clean(b.name, 100), email = clean(b.email, 200), subject = clean(b.subject, 150), message = String(b.message ?? '').trim().slice(0, 4000);
  if (!name || !subject || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ ok: false, error: 'Please provide a valid name, email, subject and message.' });
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL, to: [CONTACT_RECEIVER_EMAIL], replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`
  });
  if (error) return res.status(502).json({ ok: false, error: 'Email provider rejected the message.' });
  hits.set(ip, [...recent, now]);
  return res.status(200).json({ ok: true });
}
