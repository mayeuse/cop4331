import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'cop4331team19@gmail.com',
    pass: 'tpmz panm hizy kpza',
  },
});

export const sendMail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: 'cop4331team19@gmail.com',
    to,
    subject,
    text,
  });
};