"use strict";
// src/controllers/conversation.controller.ts
// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { getViswaOpsNumbers } from '../services/viswaOpsNumber.service';
// import { getSurveyorPhoneNumber } from '../services/surveyor.service';
// import { AppDataSource } from '../config/typeorm.config';
// import { Conversation } from '../entities/Conversation';
// import { UserMapping } from '../entities/UserMapping';
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
const twilio_1 = require("twilio");
const twilio_config_1 = __importDefault(require("../config/twilio.config"));
const typeorm_config_1 = require("../config/typeorm.config");
const NominationDetails_1 = require("../entities/NominationDetails");
const Conversation_1 = require("../entities/Conversation");
const TWILIO_WHATSAPP_NUMBER = 'whatsapp:+13462327515';
const twilioClient = new twilio_1.Twilio(process.env.TWILIO_API_KEY_SID, process.env.TWILIO_API_KEY_SECRET, { accountSid: process.env.TWILIO_ACCOUNT_SID });
// export const createOrFetchConversation = async (req: Request, res: Response) => {
//   const { jobId, agentIdentity, surveyorIdentity } = req.body;
//   try {
//       // Check if the conversation already exists
//       const existingConversations = await twilioClient.conversations.conversations.list({ limit: 20 });
//       let conversation = existingConversations.find(conv => conv.friendlyName === jobId);
//       if (!conversation) {
//           // Create a new conversation
//           conversation = await twilioClient.conversations.conversations.create({ friendlyName: jobId });
//           // Add the ops team members to the conversation
//           const opsMembers = ['opsMember1', 'opsMember2']; // Replace with actual ops members
//           for (const member of opsMembers) {
//               await twilioClient.conversations.conversations(conversation.sid).participants.create({ identity: member });
//           }
//           // Add the surveyor to the conversation
//           await twilioClient.conversations.conversations(conversation.sid).participants.create({ identity: surveyorIdentity });
//           // Add the agent to the conversation
//           await twilioClient.conversations.conversations(conversation.sid).participants.create({ identity: agentIdentity });
//       }
//       res.json({ conversationSid: conversation.sid });
//   } catch (error) {
//       console.error('Error creating or fetching conversation:', error);
//       res.status(500).send('Error creating or fetching conversation');
//   }
// };
exports.createOrFetchConversation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Fetch the list of conversations
        const conversations = yield twilioClient.conversations.conversations.list();
        // Check if a conversation with the uniqueName exists
        let conversation = conversations.find(conv => conv.uniqueName === req.body.jobId);
        if (!conversation) {
            // Conversation does not exist, create a new one
            conversation = yield twilioClient.conversations.conversations.create({
                uniqueName: req.body.jobId
            });
            // Add participants
            yield twilioClient.conversations.conversations(conversation.sid)
                .participants
                .create({ identity: req.body.agentIdentity });
            yield twilioClient.conversations.conversations(conversation.sid)
                .participants
                .create({ identity: req.body.surveyorIdentity });
            yield twilioClient.conversations.conversations(conversation.sid)
                .participants
                .create({ identity: req.body.opsIdentity });
            yield twilioClient.conversations.conversations(conversation.sid)
                .participants
                .create({ identity: req.body.clientIdentity });
        }
        res.status(200).send({ conversationSid: conversation.sid });
    }
    catch (error) {
        console.error('Error creating or fetching conversation:', error);
        res.status(500).send({ error: 'Error creating or fetching conversation' });
    }
});
// export const createOrFetchConversation = async (req: Request, res: Response) => {
//   try {
//       // Check if the conversation already exists
//       let conversation = await twilioClient.conversations.conversations('conversation_sid').fetch().catch(() => null);
//       // If not, create a new conversation
//       if (!conversation) {
//           conversation = await twilioClient.conversations.conversations.create({
//               uniqueName: req.body.jobId
//           });
//       }
//       // Add participants
//       await twilioClient.conversations.conversations(conversation.sid)
//           .participants
//           .create({ identity: req.body.agentIdentity });
//       await twilioClient.conversations.conversations(conversation.sid)
//           .participants
//           .create({ identity: req.body.surveyorIdentity });
//       await twilioClient.conversations.conversations(conversation.sid)
//           .participants
//           .create({ identity: req.body.opsIdentity });
//       await twilioClient.conversations.conversations(conversation.sid)
//           .participants
//           .create({ identity: req.body.clientIdentity });
//       res.status(200).send({ conversationSid: conversation.sid });
//   } catch (error) {
//       console.error('Error creating or fetching conversation:', error);
//       res.status(500).send({ error: 'Error creating or fetching conversation' });
//   }
// };
// export const addParticipant = async (req: Request, res: Response) => {
//   const { conversationSid, participants } = req.body;
//   // const options = {
//   //   messagingBinding: {
//   //     address: 'whatsapp:+919994478009',
//   //     proxyAddress: 'whatsapp:+13462327515'
//   //   }
//   // } as any;
//   // try {
//   //   await client.conversations.v1.conversations(conversationSid)
//   //     .participants
//   //     .create(options)
//   //   .then(participant => console.log(participant.sid));
//   //   res.status(201).json({ message: 'Participant added successfully' });
//   // }
//    try {
//     for (const phoneNumber of participants) {
//       const options: {
//         messagingBinding: {
//           address: string,
//           proxyAddress: string
//         }
//       } = {
//         messagingBinding: {
//           address: `whatsapp:${phoneNumber}`,
//           proxyAddress: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
//         }
//       };
//       await client.conversations.v1.conversations(conversationSid)
//         .participants
//         .create(options)
//         .then(participant => console.log(`Participant added: ${participant.sid}`));
//     }
//     res.status(201).json({ message: 'All participants added successfully' });
//   } catch (err:any) {
//     res.status(500).json({ error: err.message });
//   
// };
exports.createConversation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { nominationId } = req.body;
    try {
        const nominationRepository = typeorm_config_1.AppDataSource.getRepository(NominationDetails_1.NominationDetails);
        const nomination = yield nominationRepository.findOne({ where: { nominationId } });
        if (!nomination) {
            return res.status(404).json({ message: 'Nomination not found' });
        }
        const conversation = yield twilio_config_1.default.conversations.v1.conversations.create({ friendlyName: `Conversation for ${nominationId}` });
        res.status(201).json({ conversationSid: conversation.sid });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addParticipant = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { conversationSid } = req.body;
    console.log("Conversation SID:", conversationSid);
    const participants = [
        "whatsapp:+919361296676",
        "whatsapp:+918248773288" // Participant 2
    ];
    try {
        for (const number of participants) {
            const options = {
                messagingBinding: {
                    address: number,
                    proxyAddress: "whatsapp:+13462327515"
                }
            };
            console.log(`Options for participant creation: ${JSON.stringify(options)}`);
            yield twilio_config_1.default.conversations.v1.conversations(conversationSid)
                .participants
                .create(options)
                .then(participant => console.log(`Participant added: ${participant.sid}`))
                .catch(error => {
                console.error(`Error adding participant with number ${number}:`, error);
                throw error;
            });
        }
        console.log("All participants added successfully.");
        res.status(201).json({ message: 'All participants added successfully' });
    }
    catch (err) {
        console.error("Error during participant addition process:", err);
        res.status(500).json({ error: err.message });
    }
});
exports.sendGroupMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { conversationSid, message } = req.body;
    try {
        const msg = yield twilio_config_1.default.conversations.v1.conversations(conversationSid)
            .messages
            .create({ body: message });
        console.log('Message SID:', msg.sid);
        res.status(200).json({ message: 'Message sent successfully', messageSid: msg.sid });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.sendTemplate = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { conversationSid, contentSid } = req.body;
    try {
        yield twilio_config_1.default.conversations.v1.conversations(conversationSid)
            .messages
            .create({
            author: 'system',
            contentSid: contentSid
        });
        res.status(200).json({ message: 'Template message sent successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.sendPlainTemplateMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const message = yield twilio_config_1.default.messages.create({
            contentSid: "HX0388d163476ecb0553fcb8fad67dece0",
            from: 'whatsapp:+13462327515',
            messagingServiceSid: process.env.TWILIO_MESSAGING1_SERVICE_SID,
            to: 'whatsapp:+919994478009',
        });
        res.status(200).json({ messageSid: message.sid });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Fetch Conversation for BQS Mobile App
exports.getConversationByNominationId = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { nominationId } = req.params;
    try {
        const conversationRepository = typeorm_config_1.AppDataSource.getRepository(Conversation_1.Conversation);
        const conversation = yield conversationRepository.findOneBy({ nominationId });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json({ conversationSid: conversation.conversationSid });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
