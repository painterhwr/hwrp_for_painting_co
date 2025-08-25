/**
 * Simple helper to send mail via Resend or SMTP.  The environment
 * variables should be configured appropriately.  This function can
 * be called from server routes after a quote request is submitted.
 */
export async function sendMail(
  to: string,
  subject: string,
  html: string
) {
  if (process.env.RESEND_API_KEY) {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html
      })
    })
    if (!resp.ok) throw new Error('Resend failed')
  }
  // TODO: implement SMTP fallback with nodemailer or another library
}