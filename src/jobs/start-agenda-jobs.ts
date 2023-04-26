import { agenda } from "./agenda";

import {
    IStartAgendaJobs
} from "../types";

export const StartAgendaJobs = async ({
    email,
    subject,
    emailType,
    isSuvae,
    payload,
}: IStartAgendaJobs) => {
    try {
        await agenda.now("send-email", {
            email,
            subject,
            emailType,
            isSuvae,
            payload,
        });

        if (emailType === "low_rating1") {
            await agenda.schedule("in 12 hours", "send-email", {
                email,
                subject,
                emailType: "low_rating2",
                isSuvae,
                payload,
            });
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};
