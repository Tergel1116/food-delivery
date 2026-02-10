import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

