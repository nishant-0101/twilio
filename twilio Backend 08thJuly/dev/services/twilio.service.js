"use strict";
// src/services/twilio.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
const AccessToken = require("twilio/lib/jwt/AccessToken");
class TwilioService {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.apiKeySid = process.env.TWILIO_API_KEY_SID;
        this.apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
        this.chatServiceSid = process.env.TWILIO_CHAT_SERVICE_SID;
        console.log('TWILIO_ACCOUNT_SID:', this.accountSid);
        console.log('TWILIO_API_KEY_SID:', this.apiKeySid);
        console.log('TWILIO_API_KEY_SECRET:', this.apiKeySecret);
        console.log('TWILIO_CHAT_SERVICE_SID:', this.chatServiceSid);
    }
    generateToken(identity) {
        const token = new AccessToken(this.accountSid, this.apiKeySid, this.apiKeySecret);
        token.identity = identity;
        const chatGrant = new AccessToken.ChatGrant({
            serviceSid: this.chatServiceSid,
        });
        token.addGrant(chatGrant);
        return token.toJwt();
    }
}
exports.TwilioService = TwilioService;
