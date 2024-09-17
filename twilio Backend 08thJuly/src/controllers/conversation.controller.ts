// src/controllers/conversation.controller.ts
// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { getViswaOpsNumbers } from '../services/viswaOpsNumber.service';
// import { getSurveyorPhoneNumber } from '../services/surveyor.service';
// import { AppDataSource } from '../config/typeorm.config';
// import { Conversation } from '../entities/Conversation';
// import { UserMapping } from '../entities/UserMapping';

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId, clientPhone, jobId, bqsUserId } = req.body;

//   try {
//     // Fetch Viswa ops team numbers from the database
//     const viswaOpsNumbers = await getViswaOpsNumbers();

//     // Fetch surveyor's phone number dynamically from Velocity BQS app
//     const surveyorPhone = await getSurveyorPhoneNumber(jobId);

//     // Create a new conversation
//     const conversation = await client.conversations.v1.conversations.create({
//       friendlyName: `Conversation for job ${jobId}`
//     });

//     // Add Viswa ops team members
//     for (const number of viswaOpsNumbers) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({ 
//             'messagingBinding.address': number,
//             'messagingBinding.proxyAddress': process.env.TWILIO_MESSAGING_SERVICE_SID 
//           });
//     }

//     // Add surveyor
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({ 'messagingBinding.address': surveyorPhone });

//     // Add client
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({ 'messagingBinding.address': clientPhone });

//     // Add BQS user (surveyor) by their user ID
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({ identity: bqsUserId });

//     // Save conversation SID and nomination ID to the database
//     const conversationRepository = AppDataSource.getRepository(Conversation);
//     const newConversation = conversationRepository.create({ conversationSid: conversation.sid, nominationId: jobId });
//     await conversationRepository.save(newConversation);

//     // Save the user mapping
//     const userMappingRepository = AppDataSource.getRepository(UserMapping);
//     const userMapping = userMappingRepository.create({ phoneNumber: clientPhone, bqsUserId, nominationId: jobId });
//     await userMappingRepository.save(userMapping);

//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { getViswaOpsNumbers } from '../services/viswaOpsNumber.service';
// import { getSurveyorPhoneNumber } from '../services/surveyor.service';
// import { AppDataSource } from '../config/typeorm.config';
// import { Conversation } from '../entities/Conversation';
// import { UserMapping } from '../entities/UserMapping';

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId, clientPhone, jobId, bqsUserId } = req.body;

//   try {
//     const viswaOpsNumbers = await getViswaOpsNumbers();
//     const surveyorPhone = await getSurveyorPhoneNumber(jobId);

//     const conversation = await client.conversations.v1.conversations.create({
//       friendlyName: `Conversation for job ${jobId}`
//     });

//     for (const number of viswaOpsNumbers) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({
//           messagingBinding: {
//             address: number,
//             proxyAddress: `whatsapp:${process.env.TWILIO_MESSAGING_SERVICE_SID}`
//           }
//         });
//     }

//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: surveyorPhone,
//           proxyAddress: `whatsapp:${process.env.TWILIO_MESSAGING_SERVICE_SID}`
//         }
//       });

//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: clientPhone,
//           proxyAddress: `whatsapp:${process.env.TWILIO_MESSAGING_SERVICE_SID}`
//         }
//       });

//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({ identity: bqsUserId });

//     const conversationRepository = AppDataSource.getRepository(Conversation);
//     const newConversation = conversationRepository.create({ conversationSid: conversation.sid, nominationId: jobId });
//     await conversationRepository.save(newConversation);

//     const userMappingRepository = AppDataSource.getRepository(UserMapping);
//     const userMapping = userMappingRepository.create({ phoneNumber: clientPhone, bqsUserId, nominationId: jobId });
//     await userMappingRepository.save(userMapping);

//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { AppDataSource } from '../config/typeorm.config';
// import { SurveyorMaster } from '../entities/SurveyorMaster';
// import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
// import { NominationDetails } from '../entities/NominationDetails';
// import { Conversation } from '../entities/Conversation';

// const nominationDetailsRepository = AppDataSource.getRepository(NominationDetails);
// const viswaOpsNumberRepository = AppDataSource.getRepository(ViswaOpsNumber);

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { nominationId, clientPhoneNumber } = req.body;

//   try {
//     // Fetch the nomination details for the given nominationId
//     const nominationDetails = await nominationDetailsRepository.findOne({
//       where: { nominationId },
//       relations: ['surveyor'],
//     });

//     if (!nominationDetails) {
//       return res.status(404).json({ error: 'Nomination not found for the given nomination ID' });
//     }

//     const surveyorPhoneNumber = nominationDetails.surveyor.phoneNum    await client.conversations.v1.conversations(conversation.sid)
    //   .participants
    //   .create({
    //     identity: `whatsapp:${user.phoneNumber}`,
    //     messagingBinding: {
    //       address: `whatsapp:${user.phoneNumber}`,
    //       proxyAddress: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    //     }
    //   });dlyName: `Conversation for nomination ${nominationId}`,
//     });

//     // Add surveyor to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         'identity': surveyorPhoneNumber,
//       });
    // await client.conversations.v1.conversations(conversation.sid)
    //   .participants
    //   .create({
    //     messagingBinding: {
    //       address: `whatsapp:${surveyor.phoneNumber}`,
    //       proxyAddress: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    //     }
    //   }); ops team members to the conversation
//     for (const ops of viswaOpsNumbers) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({
//           'identity': ops.phoneNumber,
//         });
//     }

//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err:any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// src/controllers/conversation.controller.ts
// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { AppDataSource } from '../config/typeorm.config';
// import { NominationDetails } from '../entities/NominationDetails';
// import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
// import { Conversation } from '../entities/Conversation';
// import { SurveyorMaster } from '../entities/SurveyorMaster';
// import { User } from '../entities/user';


// const sendInitialMessage = async (conversationSid: string, message: string) => {
//     await client.conversations.v1.conversations(conversationSid)
//       .messages
//       .create({
//         body: message,
//         author: 'system'
//       });
//   };

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId, nominationId } = req.body;

//   try {
//     // Fetch user phone number
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch Viswa Ops team members
//     const viswaOpsRepository = AppDataSource.getRepository(ViswaOpsNumber);
//     const viswaOpsNumbers = await viswaOpsRepository.find();

//     // Fetch Nomination Details and Surveyor
//     const nominationRepository = AppDataSource.getRepository(NominationDetails);
//     const nomination = await nominationRepository.findOne({ where: { nominationId }, relations: ['surveyor'] });
//     if (!nomination) {
//       return res.status(404).json({ message: 'Nomination not found' });
//     }
//     const surveyor = nomination.surveyor;

//     // Create Twilio conversation
//     const conversation = await client.conversations.v1.conversations.create({ friendlyName: `Conversation for ${nominationId}` });

//     // Add client to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         'messagingBinding.address': `whatsapp:${user.phoneNumber}`,
//         'messagingBinding.proxyAddress': `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
//       });
//       .then(participant => { console.log(participant.sid); });

//     // Add Viswa Ops team members to the conversation
//     for (const ops of viswaOpsNumbers) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({
//             messagingBinding: {
//               address: `whatsapp:${ops.phoneNumber}`,
//               proxyAddress: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
//             }
//           });
//     }

//     // Add surveyor to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: `whatsapp:${surveyor.phoneNumber}`,
//           proxyAddress: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
//         }
//       });

//     // // Save conversation SID to the database
//     // const conversationRepository = AppDataSource.getRepository(Conversation);
//     // const newConversation = conversationRepository.create({ conversationSid: conversation.sid, nominationId });
//     // await conversationRepository.save(newConversation);

//     await sendInitialMessage(conversation.sid, `Welcome to the conversation for nomination ID: ${nominationId}`);
//     console.log('Conversation initiated:', conversation.sid);


//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err:any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { AppDataSource } from '../config/typeorm.config';
// import { NominationDetails } from '../entities/NominationDetails';
// import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
// import { Conversation } from '../entities/Conversation';
// import { SurveyorMaster } from '../entities/SurveyorMaster';
// import { User } from '../entities/user';

// const sendInitialMessage = async (conversationSid: string, message: string) => {
//   await client.conversations.v1.conversations(conversationSid)
//     .messages
//     .create({
//       body: message,
//       author: 'system'
//     });
// };

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId, nominationId } = req.body;

//   try {
//     // Create Twilio conversation
//     const conversation = await client.conversations.v1.conversations.create({ friendlyName: `Conversation for ${nominationId}` });

//     // Add client to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: `whatsapp:+917708524645`,
//           proxyAddress: `whatsapp:+13462327515`
//         }
//       });

//     // Add Viswa Ops team member to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: `whatsapp:+919840320234`,
//           proxyAddress: `whatsapp:+13462327515`
//         }
//       });

//     // Add surveyor to the conversation
//     await client.conversations.v1.conversations(conversation.sid)
//       .participants
//       .create({
//         messagingBinding: {
//           address: `whatsapp:+919941090162`,
//           proxyAddress: `whatsapp:+13462327515`
//         }
//       });

//     await sendInitialMessage(conversation.sid, `Welcome to the conversation for nomination ID: ${nominationId}`);
//     console.log('Conversation initiated:', conversation.sid);

//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import { Request, Response } from 'express';
// import client from '../config/twilio.config';
// import { AppDataSource } from '../config/typeorm.config';
// import { NominationDetails } from '../entities/NominationDetails';
// import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
// import { Conversation } from '../entities/Conversation';
// import { SurveyorMaster } from '../entities/SurveyorMaster';
// import { User } from '../entities/user';

// const sendInitialMessage = async (conversationSid: string, message: string) => {
//   await client.conversations.v1.conversations(conversationSid)
//     .messages
//     .create({
//       body: message,
//       author: 'system'
//     });
// };

// export const initiateConversation = async (req: Request, res: Response) => {
//   const { userId, nominationId } = req.body;

//   try {
//     // Create Twilio conversation
//     const conversation = await client.conversations.v1.conversations.create({
//       friendlyName: `Conversation for ${nominationId}`
//     });

//     // Add participants to the conversation
//     const participants = [
//       // { address: 'whatsapp:+917708524645', proxyAddress: 'whatsapp:+13462327515' },
//       { address: 'whatsapp:+919791183469', proxyAddress: 'whatsapp:+13462327515' },
//       // { address: 'whatsapp:+918778930164', proxyAddress: 'whatsapp:+13462327515' }
//     ];

//     for (const participant of participants) {
//       await client.conversations.v1.conversations(conversation.sid)
//         .participants
//         .create({ messagingBinding: participant });
//     }

//     // Send initial message
//     await sendInitialMessage(conversation.sid, `Welcome to the conversation for nomination ID: ${nominationId}`);
//     console.log('Conversation initiated:', conversation.sid);

//     res.status(201).json({ conversationSid: conversation.sid });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

import { Request, Response } from 'express';
import { Twilio } from 'twilio';
import client from '../config/twilio.config';
import { AppDataSource } from '../config/typeorm.config';
import { NominationDetails } from '../entities/NominationDetails';
import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';
import { Conversation } from '../entities/Conversation';
import { SurveyorMaster } from '../entities/SurveyorMaster';
import { User } from '../entities/user';

const TWILIO_WHATSAPP_NUMBER = 'whatsapp:+13462327515';
const twilioClient = new Twilio(
  process.env.TWILIO_API_KEY_SID as string,
  process.env.TWILIO_API_KEY_SECRET as string,
  { accountSid: process.env.TWILIO_ACCOUNT_SID as string }
);


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
export const createOrFetchConversation = async (req: Request, res: Response) => {
  try {
     // Fetch the list of conversations
    const conversations = await twilioClient.conversations.conversations.list();

    // Check if a conversation with the uniqueName exists
    let conversation = conversations.find(conv => conv.uniqueName === req.body.jobId);

    if (!conversation) {
        // Conversation does not exist, create a new one
        conversation = await twilioClient.conversations.conversations.create({
            uniqueName: req.body.jobId
        });

        // Add participants
        await twilioClient.conversations.conversations(conversation.sid)
            .participants
            .create({ identity: req.body.agentIdentity });

        await twilioClient.conversations.conversations(conversation.sid)
            .participants
            .create({ identity: req.body.surveyorIdentity });

        await twilioClient.conversations.conversations(conversation.sid)
            .participants
            .create({ identity: req.body.opsIdentity });

        await twilioClient.conversations.conversations(conversation.sid)
            .participants
            .create({ identity: req.body.clientIdentity });
    }

    res.status(200).send({ conversationSid: conversation.sid });
} catch (error) {
    console.error('Error creating or fetching conversation:', error);
    res.status(500).send({ error: 'Error creating or fetching conversation' });
}
};

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

export const createConversation = async (req: Request, res: Response) => {
  const { nominationId } = req.body;

  try {
    const nominationRepository = AppDataSource.getRepository(NominationDetails);
    const nomination = await nominationRepository.findOne({ where: { nominationId } });
    if (!nomination) {
      return res.status(404).json({ message: 'Nomination not found' });
    }

    const conversation = await client.conversations.v1.conversations.create({ friendlyName: `Conversation for ${nominationId}` });

    res.status(201).json({ conversationSid: conversation.sid });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export const addParticipant = async (req: Request, res: Response) => {
  const { conversationSid } = req.body;

  console.log("Conversation SID:", conversationSid);

  const participants = [
    "whatsapp:+919361296676",  // Participant 1
    "whatsapp:+918248773288"   // Participant 2
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

      await client.conversations.v1.conversations(conversationSid)
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
  } catch (err: any) {
    console.error("Error during participant addition process:", err);
    res.status(500).json({ error: err.message });
  }
};



export const sendGroupMessage = async (req: Request, res: Response) => {
  const { conversationSid, message } = req.body;

  try {
    const msg = await client.conversations.v1.conversations(conversationSid)
      .messages
      .create({ body: message });

    console.log('Message SID:', msg.sid);
    res.status(200).json({ message: 'Message sent successfully', messageSid: msg.sid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const sendTemplate = async (req: Request, res: Response) => {
  const { conversationSid, contentSid } = req.body;

  try {
    await client.conversations.v1.conversations(conversationSid)
      .messages
      .create({
        author: 'system',
        contentSid: contentSid
      });

    res.status(200).json({ message: 'Template message sent successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const sendPlainTemplateMessage = async (req: Request, res: Response) => {
  try {
    const message = await client.messages.create({
      contentSid: "HX0388d163476ecb0553fcb8fad67dece0", // Your approved contentSid
      from: 'whatsapp:+13462327515', // Your Twilio WhatsApp number
      messagingServiceSid:process.env.TWILIO_MESSAGING1_SERVICE_SID,
      to: 'whatsapp:+919994478009', // Recipient's WhatsApp number
      // contentVariables: JSON.stringify({ 1: "Name" }) 
    });

    res.status(200).json({ messageSid: message.sid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch Conversation for BQS Mobile App

export const getConversationByNominationId = async (req: Request, res: Response) => {
    const { nominationId } = req.params;
  
    try {
      const conversationRepository = AppDataSource.getRepository(Conversation);
      const conversation = await conversationRepository.findOneBy({ nominationId });
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      res.status(200).json({ conversationSid: conversation.conversationSid });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
  