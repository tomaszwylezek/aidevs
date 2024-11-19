import axios from 'axios';
import { VerifyResponse } from '../../../types/api.types';
import { getEnvVariables } from '../../../env';

export class SubmitService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = getEnvVariables().s01e02.verifyUrl;
    }

    async submit(answer: string, msgId: string): Promise<VerifyResponse> {
        try {
            const response = await axios.post<VerifyResponse>(
                this.baseUrl,
                {
                    text: answer,
                    msgID: msgId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error in submit service:', error);
            throw error;
        }
    }
} 