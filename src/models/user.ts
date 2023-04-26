import { Schema, model, Document } from "mongoose";

export interface UserDoc extends Document {
  _id: String;
  name: String;
  email: String;
  password: String;
  accountType: String;
  status: "ACTIVE" | "NON-ACTIVE";
  GoogleAuthid: String;
  photos: String;
  GoogleAuthCode: String;
  GoogleAccessToken: String;
  GoogleRefreshToen: String;
}

const schema = new Schema<UserDoc>(
  {
    _id: { type: String },
    name: { type: String },
    email: {
      type: String,
    },
    password: { type: String },
    accountType: {
      type: String,
    },
    GoogleAuthid: {
      type: String,
    },
    photos: {
      type: String,
    },
    GoogleAuthCode: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "NON-ACTIVE",
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const User = model("user", schema, "users");
