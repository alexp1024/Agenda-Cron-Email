import { Schema, model, Document } from "mongoose";

export interface AgendaDoc extends Document {}

const schema = new Schema<AgendaDoc>(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

export const AgendaJob = model("agendaJob", schema, "agendaJobs");
