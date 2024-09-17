"use strict";
// src/routes/twilio.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_controller_1 = require("../controllers/twilio.controller");
const router = express_1.Router();
const twilioController = new twilio_controller_1.TwilioController();
router.get('/token', (req, res) => twilioController.getToken(req, res));
exports.default = router;
