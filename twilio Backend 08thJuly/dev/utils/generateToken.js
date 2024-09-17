"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccessToken = twilio_1.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const ACCESS_TOKEN_EXPIRY = 15 * 60; // Twilio token expiry in seconds (15 minutes)
const REFRESH_TOKEN_EXPIRY = '7d'; // Refresh token expiry (7 days)
// Function to generate both Twilio token and refresh token
exports.generateToken = (phoneNumber) => {
    // Generate the Twilio token with 15-minute expiry
    const twilioToken = generateTwilioToken(phoneNumber);
    // Generate the refresh token with 7-day expiry
    const refreshToken = jsonwebtoken_1.default.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    // Return both tokens
    return { twilioToken, refreshToken };
};
// Function to generate Twilio Access Token with expiry
const generateTwilioToken = (phoneNumber) => {
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioApiKey = process.env.TWILIO_API_KEY_SID;
    const twilioApiSecret = process.env.TWILIO_API_KEY_SECRET;
    const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
    // Create a chat grant for the Twilio service
    const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
    });
    // Create an Access Token for Twilio
    const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
        identity: phoneNumber,
        ttl: ACCESS_TOKEN_EXPIRY // Set expiration to 15 minutes (in seconds)
    });
    // Add the Chat Grant to the token
    token.addGrant(chatGrant);
    // Return the token as a JWT
    return token.toJwt();
};
