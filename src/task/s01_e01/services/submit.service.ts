import axios from 'axios';
import * as cheerio from 'cheerio';
import { getEnvVariables } from '../../../env';
import { handleAxiosError } from '../../../utils/error.handler';

interface SubmitResponse {
    status: string;
    message?: string;
    error?: string;
    url?: string;
}

export class SubmitService {
    private readonly baseUrl: string;
    private readonly credentials: { username: string; password: string };

    constructor() {
        const env = getEnvVariables();
        this.baseUrl = env.s01e01.baseUrl;
        this.credentials = {
            username: env.s01e01.username,
            password: env.s01e01.password
        };
    }

    private getFullUrl(href: string): string {
        try {
            new URL(href);
            return href;
        } catch {
            const baseUrl = new URL(this.baseUrl);
            return new URL(href, baseUrl).toString();
        }
    }

    async submitAnswer(answer: string): Promise<SubmitResponse> {
        try {
            const formData = new URLSearchParams();
            formData.append('username', this.credentials.username);
            formData.append('password', this.credentials.password);
            formData.append('answer', answer);

            const response = await axios.post(this.baseUrl, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const $ = cheerio.load(response.data);
            
            $('a').each((_, element) => {
                const href = $(element).attr('href');
                const text = $(element).text();
                if (href) {
                    const fullUrl = this.getFullUrl(href);
                    console.log('Found link:', { url: fullUrl, text });
                }
            });

            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }
} 