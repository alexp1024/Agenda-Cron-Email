import express, { Request, Response } from "express";
import { SetupDatabase, config } from "./config";
import { agenda, StartAgendaJobs } from "./jobs";
import { definitions } from "./jobs/definitions";
const Agendash = require("agendash");
import "dotenv/config";

const app = express();

SetupDatabase()?.then(() => {
    app.listen({ port: config.PORT }, async () => {
        console.log(`app listening on port ${config.PORT}!`);
        agenda.start();
        agenda.on("ready", () => console.log("Agenda Started"));

        definitions.forEach(define => {
            define(agenda);
        });

        // For Development
        app.use("/dash", Agendash(agenda));

        app.get("/send-email", async (request: Request, res: Response) => {
            try {
                const { query } = request;
                const { email, subject, emailType, isSuvae, payload } = query;
                const jsonPayload = JSON.parse(payload as string);
                const suvae = Number(isSuvae) === 1 ? true : false;
                await StartAgendaJobs({
                    email: email as string,
                    subject: subject as string,
                    emailType: emailType as string,
                    isSuvae: suvae as boolean,
                    payload: jsonPayload as string,
                });
                return res.status(200).json({
                    message: `Agenda Jobs of Email started Successfully`,
                });
            } catch (error: any) {
                return res.status(200).json({
                    message: error.message,
                });
            }
        });
    });
});
