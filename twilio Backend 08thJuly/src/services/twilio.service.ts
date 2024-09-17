// src/services/twilio.service.ts

import AccessToken = require('twilio/lib/jwt/AccessToken');

export class TwilioService {
  private accountSid: string;
  private apiKeySid: string;
  private apiKeySecret: string;
  private chatServiceSid: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID as string;
    this.apiKeySid = process.env.TWILIO_API_KEY_SID as string;
    this.apiKeySecret = process.env.TWILIO_API_KEY_SECRET as string;
    this.chatServiceSid = process.env.TWILIO_CHAT_SERVICE_SID as string;
    console.log('TWILIO_ACCOUNT_SID:', this.accountSid);
    console.log('TWILIO_API_KEY_SID:', this.apiKeySid);
    console.log('TWILIO_API_KEY_SECRET:', this.apiKeySecret);
    console.log('TWILIO_CHAT_SERVICE_SID:', this.chatServiceSid);

  }

  generateToken(identity: string): string {
    const token = new AccessToken(this.accountSid, this.apiKeySid, this.apiKeySecret);
    token.identity = identity;

    const chatGrant = new AccessToken.ChatGrant({
      serviceSid: this.chatServiceSid,
    });
    token.addGrant(chatGrant);

    return token.toJwt();
  }
}
