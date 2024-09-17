"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entities/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_config_1 = require("../config/typeorm.config");
const generateToken_1 = require("../utils/generateToken");
const twilio_1 = require("twilio");
const client = new twilio_1.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const userRepository = typeorm_config_1.AppDataSource.getRepository(user_1.User);
exports.sendOTP = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('sendOTP body:', req.body);
    const { phoneNumber } = req.body;
    try {
        yield client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });
        res.status(200).json({ message: 'OTP sent' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.verifyOTP = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('verifyOTP body:', req.body);
    const { phoneNumber, code } = req.body;
    try {
        const verificationCheck = yield client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: phoneNumber, code });
        if (verificationCheck.status === 'approved') {
            let user = yield userRepository.findOneBy({ phoneNumber });
            if (!user) {
                return res.status(200).json({ newUser: true, message: 'OTP verified, please provide additional details' });
            }
            else {
                const { twilioToken, refreshToken } = generateToken_1.generateToken(user.phoneNumber);
                // Store the refresh token in the database (or secure location)
                user.refreshToken = refreshToken;
                yield userRepository.save(user);
                return res.status(200).json({
                    twilioToken,
                    refreshToken,
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userType: user.userType
                });
            }
        }
        else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateUserDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('updateUserDetails body:', req.body);
    const { phoneNumber, firstName, lastName, userType, email } = req.body;
    try {
        let user = yield userRepository.findOneBy({ phoneNumber });
        if (!user) {
            // New user case, create a new user with the provided details
            user = userRepository.create({ phoneNumber, firstName, lastName, userType, email });
            yield userRepository.save(user);
        }
        else {
            // Existing user case, update the user details
            user.firstName = firstName;
            user.lastName = lastName;
            user.userType = userType;
            user.email = email;
            yield userRepository.save(user);
        }
        // Generate both Twilio token and refresh token
        const { twilioToken, refreshToken } = generateToken_1.generateToken(user.phoneNumber);
        // Store the refresh token
        user.refreshToken = refreshToken;
        yield userRepository.save(user);
        res.status(200).json({
            twilioToken,
            refreshToken,
            userId: user.id,
            firstName,
            lastName,
            userType
        });
    }
    catch (err) {
        console.error('Error updating user details:', err);
        res.status(500).json({ error: err.message });
    }
});
exports.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
        const phoneNumber = decoded.phoneNumber;
        // Find the user associated with the refresh token
        const user = yield userRepository.findOneBy({ phoneNumber, refreshToken });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        // Generate new tokens
        const { twilioToken, refreshToken: newRefreshToken } = generateToken_1.generateToken(phoneNumber);
        // Update the refresh token in the database
        user.refreshToken = newRefreshToken;
        yield userRepository.save(user);
        // Return the new tokens
        return res.status(200).json({ twilioToken, refreshToken: newRefreshToken });
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
});
