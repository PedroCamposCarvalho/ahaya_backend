import AppError from '@shared/errors/AppError';
import axios from 'axios';

const url = 'https://api.brevo.com/v3/smtp/email';

const API_KEY = String(process.env.BREVO_API_KEY);

const headers = {
  accept: 'application/json',
  'api-key': API_KEY,
  'content-type': 'application/json',
};

interface IEmailPayload {
  sender: {
    name: string;
    email: string;
  };
  to: Array<{
    email: string;
    name: string;
  }>;
  subject: string;
  htmlContent: string;
}

/**
 * Sends an email using the Brevo API.
 * @param recipientEmail - The recipient's email address.
 * @param recipientName - The recipient's name.
 * @param resetCode - The HTML content of the email.
 * @returns A Promise that resolves when the email is sent successfully.
 */
const sendEmail = async (
  recipientEmail: string,
  recipientName: string,
  resetCode: string,
): Promise<void> => {
  const emailData: IEmailPayload = {
    sender: {
      name: 'Aplicativo Ahaya',
      email: 'pedrocamposcarvalho97@gmail.com',
    },
    to: [
      {
        email: recipientEmail,
        name: recipientName,
      },
    ],
    subject: 'Código de recuperação de senha!',
    htmlContent: `
      <html>
        <head></head>
        <body>
          <p>Olá ${recipientName},</p>
          <p>Você solicitou a redefinição de sua senha. Use o código abaixo para prosseguir:</p>
          <h2 style="color: blue;">${resetCode}</h2>
          <p>Se você não solicitou isso, por favor ignore este email.</p>
          <p>Atenciosamente,<br/>Ahaya</p>
        </body>
      </html>
    `,
  };

  try {
    await axios.post(url, emailData, {
      headers,
    });
  } catch (error: any) {
    throw new AppError(
      'Não foi possível enviar o email de recuperação de senha.',
    );
  }
};

export default sendEmail;
