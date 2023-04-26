import Agenda from "agenda";
import { sendEmail } from "./utils";
import {
    afterSignUpTemplate,
    forgotPasswordEmailTemplate,
    highRatingEmailTemplate1,
    updatedPasswordEmailTemplate,
} from "../../utils/email-templates";

interface IEmailOrder {
    email: string;
    subject: string;
    emailType: string;
    isSuvae: boolean;
    payload?: any;
}

export const emailSendDefinitions = (agenda: Agenda) =>
    agenda.define("send-email", { priority: 20 }, async (job, done) => {
        try {
            const { email, subject, emailType, isSuvae, payload } = job.attrs
                .data as IEmailOrder;
            let emailBody = "";

            const suvaeURL =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:3009"
                    : "https://dashboard.suvae.com/";

            const easyRebateURL =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:3009"
                    : "https://easyrebate.co";

            switch (emailType) {
                case "low_rating1":
                    emailBody =
                        "Your submission is being processed. It usually takes up to 24 hours to verify your order details.";
                    break;
                case "low_rating2":
                    emailBody = `Hello! Can you please confirm that your Order ID was for the < ${payload.productName} >?`;
                    break;
                case "high_rating1":
                    emailBody = highRatingEmailTemplate1(
                        easyRebateURL,
                        payload.feedbackUrl,
                    );
                    break;

                case "forgot_password":
                    emailBody = forgotPasswordEmailTemplate(
                        suvaeURL,
                        payload.resetPasswordUrl,
                    );
                    break;
                case "after_signup":
                    emailBody = afterSignUpTemplate(
                        suvaeURL,
                        payload.onBoardingURL,
                        payload.otp,
                    );
                    break;

                case "update_password":
                    emailBody = updatedPasswordEmailTemplate(
                        suvaeURL,
                        payload.loginUrl,
                    );
                    break;

                default:
                    break;
            }
            const result = await sendEmail(email, subject, emailBody, isSuvae);
            done();
        } catch (error: any) {
            job.attrs.failReason = error.message;
            // @ts-ignore
            done(error);
        }
    });
