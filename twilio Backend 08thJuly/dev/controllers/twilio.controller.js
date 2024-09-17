"use strict";
// src/controllers/twilio.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_service_1 = require("../services/twilio.service");
class TwilioController {
    constructor() {
        this.twilioService = new twilio_service_1.TwilioService();
    }
    getToken(req, res) {
        try {
            const identity = req.query.identity;
            const token = this.twilioService.generateToken(identity);
            res.status(200).json({ identity, token });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to generate token', error });
        }
    }
}
exports.TwilioController = TwilioController;
