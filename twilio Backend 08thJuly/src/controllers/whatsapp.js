// const twilio = require('twilio');
// const client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// // Function to create a new conversation
// async function createConversation(jobId) {
//   const conversation = await client.conversations.conversations.create({
//     friendlyName: `Job ID: ${jobId}`
//   });
//   return conversation.sid;
// }

// // Function to add a participant to a conversation
// async function addParticipant(conversationSid, participantNumber) {
//   await client.conversations.conversations(conversationSid)
//     .participants
//     .create({
//       'messagingBinding.address': participantNumber,
//       'messagingBinding.proxyAddress': 'whatsapp:+YOUR_TWILIO_WHATSAPP_NUMBER'
//     });
// }

// // Main function to create groups for multiple job IDs
// async function createGroupsForJobs(jobIds, participants) {
//   for (const jobId of jobIds) {
//     const conversationSid = await createConversation(jobId);
//     for (const participant of participants) {
//       await addParticipant(conversationSid, participant);
//     }
//   }
// }

// // Example usage
// const jobIds = ['job1', 'job2', 'job3'];
// const participants = ['whatsapp:+1234567890', 'whatsapp:+0987654321'];

// createGroupsForJobs(jobIds, participants)
//   .then(() => console.log('Groups created successfully'))
//   .catch(error => console.error('Error creating groups:', error));


const twilio = require('twilio');
const client = new twilio('YOUR_TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_AUTH_TOKEN');

// Function to create a new conversation for a specific job ID
async function createConversationForJob(jobId) {
  try {
    const conversation = await client.conversations.conversations.create({
      friendlyName: `Job ID: ${jobId}`
    });
    return conversation.sid;
  } catch (error) {
    console.error(`Failed to create conversation for Job ID ${jobId}:`, error);
    throw error;
  }
}

// Function to add a participant to a specific conversation
async function addParticipantToConversation(conversationSid, participantNumber) {
  try {
    await client.conversations.conversations(conversationSid)
      .participants
      .create({
        'messagingBinding.address': participantNumber,
        'messagingBinding.proxyAddress': 'whatsapp:+YOUR_TWILIO_WHATSAPP_NUMBER'
      });
  } catch (error) {
    console.error(`Failed to add participant ${participantNumber} to conversation ${conversationSid}:`, error);
    throw error;
  }
}

// Main function to create groups for multiple job IDs with static participants
async function createGroupsForJobs(jobIds, participants) {
  for (const jobId of jobIds) {
    try {
      const conversationSid = await createConversationForJob(jobId);
      for (const participant of participants) {
        await addParticipantToConversation(conversationSid, participant);
      }
      console.log(`Group created successfully for Job ID: ${jobId}`);
    } catch (error) {
      console.error(`Error processing Job ID ${jobId}:`, error);
    }
  }
}

// Example usage
const jobIds = ['job1', 'job2', 'job3'];
const participants = ['whatsapp:+919791183469', 'whatsapp:+919840320234'];

createGroupsForJobs(jobIds, participants)
  .then(() => console.log('All groups created successfully'))
  .catch(error => console.error('Error in group creation process:', error));
