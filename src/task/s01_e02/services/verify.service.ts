import axios from 'axios';
import { VerifyResponse } from '../../../types/api.types';
import { getEnvVariables } from '../../../env';

export class VerifyService {
    private baseUrl: string;
    private currentMsgId: string = '0';

    constructor() {
        this.baseUrl = getEnvVariables().s01e02.verifyUrl;
    }

    async getInitialPrompt(): Promise<string> {
        const response = await this.verify('READY');
        return response.text;
    }

    async verify(text: string): Promise<VerifyResponse> {
        try {
            const response = await axios.post<VerifyResponse>(
                this.baseUrl,
                {
                    text,
                    msgID: this.currentMsgId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            this.currentMsgId = response.data.msgID;
            return response.data;
        } catch (error) {
            console.error('Error in verify service:', error);
            throw error;
        }
    }

    getCurrentMsgId(): string {
        return this.currentMsgId;
    }
} 