import axios from 'axios';
import { getEnvVariables } from '../../../env';
import { CalibrationData } from '../types/data.types';

interface VerificationPayload {
    task: string;
    apikey: string;
    answer: CalibrationData;
}

interface VerificationResponse {
    code: number;
    msg: string;
    [key: string]: any;
}

export class SendService {
    private verifyUrl: string;
    private apiKey: string;

    constructor() {
        const env = getEnvVariables();
        this.verifyUrl = env.s01e03.verifyUrl;
        this.apiKey = env.apiKey;
    }

    async send(data: CalibrationData): Promise<VerificationResponse> {
        try {
            const payload: VerificationPayload = {
                task: 'JSON',
                apikey: this.apiKey,
                answer: data
            };

            const response = await axios.post<VerificationResponse>(
                this.verifyUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending verification:', error);
            throw error;
        }
    }
} 