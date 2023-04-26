import SMTPTransport from "nodemailer/lib/smtp-transport";
import { createTransport } from "nodemailer";
import { config } from "../../config";

export const sendEmail = async (
        email: string,
        subject: string,
        emailBody: string,
        isSuvae: boolean,
    ): Promise<SMTPTransport.SentMessageInfo> => {
        try {
            const port = Number(config.MAIL_PORT);
            const transporter = createTransport(
                new SMTPTransport({
                    host: config.MAIL_HOST,
                    port,
                    secure: true,
                    auth: {
                        user: config.MAIL_USERNAME,
                        pass: config.MAIL_PASSWORD,
                    },
                }),
            );
            const sentMessageInfo = await transporter.sendMail({
                from: isSuvae
                    ? config.FROM_EMAIL_ADDRESS_SUVAE
                    : config.FROM_EMAIL_ADDRESS_EASY_REBATE,
                to: email,
                subject,
                html: emailBody,
            });
            return sentMessageInfo;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    