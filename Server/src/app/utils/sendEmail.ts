/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import { envVariables } from "../config/env";
import path from "path";
import ejs from "ejs";
import AppError from "../errorHelper/AppError";

const transporter = nodemailer.createTransport({
  port: Number(envVariables.EMAIL_SENDER.SMTP_PORT),
  host: envVariables.EMAIL_SENDER.SMTP_HOST,
  secure: Number(envVariables.EMAIL_SENDER.SMTP_PORT) === 465,
  auth: {
    user: envVariables.EMAIL_SENDER.SMTP_USER,
    pass: envVariables.EMAIL_SENDER.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: SendEmailOptions) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "templates",
      `${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVariables.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
    console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
  } catch (error: any) {
    console.log("email sending error", error.message);
    throw new AppError(401, "Email error");
  }
};
