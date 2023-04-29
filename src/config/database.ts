import { connection, connect, ConnectOptions } from "mongoose";
import { config } from ".";

const options: ConnectOptions = {
    autoCreate: true,
};

export function SetupDatabase() {
    const { readyState } = connection;
    if (readyState !== 1) {
        return connect(config.MONGO_URL as string, options);
    }
}
