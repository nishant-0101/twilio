import { Twilio } from 'twilio';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export default client;
