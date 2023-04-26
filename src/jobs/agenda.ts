import Agenda from "agenda";
import { config } from "../config/Econfig";

export const agenda = new Agenda({
  db: {
    address: config.MONGO_URL as string,
    collection: "agendaJobs",
  },
  defaultConcurrency: 20,
  maxConcurrency: 100,
  defaultLockLifetime: 20 * 60000,
});
