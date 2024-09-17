import axios from 'axios';

export const getSurveyorPhoneNumber = async (nominationId: string): Promise<string> => {
  // Make a request to the Velocity BQS app to get the surveyor's phone number
  // Example URL, modify as per your actual endpoint
//   const url = `https://velociti.co/BQS/api/surveyor/${nominationId}`;
  const url = ``;
  const response = await axios.get(url);
  return response.data.phoneNumber;
};
