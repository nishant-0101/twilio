"use strict";
// import { Request, Response } from 'express';
// import { Twilio } from 'twilio';
// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);
// // const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// interface AuthenticatedRequest extends Request {
//     user?: {
//       userId: number;
//     };
//   }
// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId } = req.user!;
//   const { members } = req.body;
//   try {
//     const conversation = await client.conversations.v1.conversations.create({ friendlyName: `Conversation for user ${userId}` });
//     for (const member of members) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({ 'messagingBinding.address': member });
//     }
//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
