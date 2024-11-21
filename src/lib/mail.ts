import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%); display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; color: white;">
          <h1 style="margin: 0 0 16px; font-size: 32px; font-weight: 700; text-transform: capitalize;">Smålag.</h1>
  
    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(16px); border-radius: 16px; padding: 24px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.2); width: fit-content; max-width: 400px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Confirm Your Email</h1>
        <p style="margin: 16px 0; font-size: 16px; line-height: 1.5;">
          Thank you for signing up! Please confirm your email by clicking the button below.
        </p>
        <a href="${confirmLink}" 
          style="
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            text-decoration: none; 
            background-color: #FFFFFF; 
            color: #000000; 
            font-size: 14px; 
            font-weight: 500; 
            padding: 10px 20px; 
            border-radius: 8px; 
            border: 1px solid rgba(0, 0, 0, 0.1); 
            transition: background-color 0.3s ease;
          " 
          onmouseover="this.style.backgroundColor='#F3F4F6'" 
          onmouseout="this.style.backgroundColor='#FFFFFF'"
        >
          Confirm Email
        </a>
        <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-top: 16px;">
          If you did not sign up, you can safely ignore this email.
        </p>
      </div>
    </div>
  `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
