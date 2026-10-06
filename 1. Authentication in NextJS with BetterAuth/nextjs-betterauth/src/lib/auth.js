
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend';


const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);

const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },

  emailVerification: {
    sendVerificationEmail: ({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `
      <div>
        <h2>Verify Your Email Address</h2>

        <p>Hello ${user.name},</p>

        <p>
          You recently created an account with us using this email address:
          <strong>${user.email}</strong>
        </p>

        <p>
          Please read this message carefully before clicking the link.
          If you created this account yourself, you can safely continue.
        </p>

        <p>
          <strong>Important:</strong> Clicking the verification link below
          will immediately verify your email address.
        </p>

        <p>
          <a href="${url}">
            Click here to verify your email address
          </a>
        </p>

        <p>
          If you did not create this account, please do not click the link.
          You can safely ignore this email.
        </p>

        <p>
          Thank you,<br />
          Acme Team
        </p>
      </div>
    `,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 7 * 24 * 3600 // 7 days
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, { client }),
});