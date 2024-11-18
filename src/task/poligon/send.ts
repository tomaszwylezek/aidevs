import axios from 'axios';
import { getEnvVariables } from '../../env';

interface VerificationPayload {
  task: string;
  apikey: string;
  answer: string[];
}

interface VerificationResponse {
  code: number;
  msg: string;
  [key: string]: any; // for any additional fields in the response
}

export const sendVerification = async (payload: VerificationPayload): Promise<VerificationResponse> => {
  try {
    const env = getEnvVariables();
    const response = await axios.post<VerificationResponse>(env.poligon.verifyUrl, payload);
    return response.data;
  } catch (error) {
    console.error('Error sending verification:', error);
    throw error;
  }
}; 