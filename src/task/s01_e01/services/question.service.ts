import axios from 'axios';
import * as cheerio from 'cheerio';
import { getEnvVariables } from '../../../env';

export class QuestionService {
    private readonly baseUrl: string;

    constructor() {
        const env = getEnvVariables();
        this.baseUrl = env.s01e01.baseUrl;
    }

    async fetchQuestion(): Promise<string> {
        try {
            const response = await axios.get(this.baseUrl);
            const $ = cheerio.load(response.data);
            
            const questionElement = $('#human-question');
            
            if (!questionElement.length) {
                throw new Error('Element with id "human-question" not found on the page');
            }
            
            const question = questionElement.text().trim();
            
            if (!question) {
                throw new Error('Question text is empty');
            }
            
            return question;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to fetch page: ${error.message}`);
            }
            throw error;
        }
    }
} 