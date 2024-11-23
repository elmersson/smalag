import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const confirmLink = `${domain}/new-verification?token=${token}`;

  const emailContent: EmailContent = {
    title: "Confirm Your Email",
    message:
      "Thank you for signing up! Please confirm your email by clicking the button below.",
    buttonText: "Confirm Email",
    buttonLink: confirmLink,
  };

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: generateEmailHtml(emailContent),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  const emailContent: EmailContent = {
    title: "Reset Your Password",
    message:
      "We received a request to reset your password. Please click the button below to proceed.",
    buttonText: "Reset Password",
    buttonLink: resetLink,
  };

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: generateEmailHtml(emailContent),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const emailContent: EmailContent = {
    title: "Your 2FA Code",
    message: `Use the following code to complete your login: <strong>${token}</strong>`,
  };

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: generateEmailHtml(emailContent),
  });
};

interface EmailContent {
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
}

const generateEmailHtml = ({
  title,
  message,
  buttonText,
  buttonLink,
}: EmailContent): string => {
  return `
  <div style="font-family: 'Plus Jakarta Sans', sans-serif; background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%); padding: 40px 0; color: white;">
    <!-- Wrapper for Centering -->
    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
      <!-- Text Above the Card -->
      <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 24px; text-transform: capitalize;">Smålag.</h1>
      <!-- Card Container -->
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(16px); border-radius: 16px; padding: 24px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.2);">
        <h2 style="font-size: 24px; font-weight: 600; margin: 0 0 16px;">${title}</h2>
        <p style="font-size: 16px; line-height: 1.5; margin: 0 0 24px;">${message}</p>
        ${
          buttonText && buttonLink
            ? `
        <a href="${buttonLink}" 
          style="
            display: inline-block; 
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
          ${buttonText}
        </a>
        `
            : ""
        }
        <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-top: 16px;">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  </div>
  `;
};
