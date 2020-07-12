import { ConnectionOptions } from "mongoose";

export default interface MongoConfig {
    url : string;
    options : ConnectionOptions
}