import axios from 'axios';
import { getEnvVariables } from '../../../env';
import { CalibrationData } from '../types/data.types';
import { OpenAIService } from '../../../services/openai.service';
import { SYSTEM_MESSAGE } from '../config/openai.config';

export class FetchDataService {
    private dataUrl: string;
    private apiKey: string;
    private openAIService: OpenAIService;

    constructor() {
        const env = getEnvVariables();
        this.dataUrl = env.s01e03.dataUrl;
        this.apiKey = env.apiKey;
        this.openAIService = new OpenAIService(SYSTEM_MESSAGE);
    }

    async fetch(): Promise<CalibrationData> {
        try {
            const response = await axios.get<CalibrationData>(this.dataUrl);
            
            // Process test questions
            const processedData = await this.processTestData(response.data);
            
            // Replace the apikey with our key
            const modifiedData: CalibrationData = {
                ...processedData,
                apikey: this.apiKey
            };
            
            console.log('Response from data URL:', modifiedData);
            return modifiedData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    private evaluateExpression(expression: string): number {
        try {
            // Safety checks
            if (expression.length > 10) {
                console.log(`Expression too long: ${expression}`);
                return NaN;
            }
            
            if (!expression.includes('+')) {
                console.log(`Expression doesn't contain addition: ${expression}`);
                return NaN;
            }

            // Using Function instead of eval for better security
            return new Function(`return ${expression}`)();
        } catch (error) {
            console.error(`Error evaluating expression ${expression}:`, error);
            return NaN;
        }
    }

    private async processTestData(data: CalibrationData): Promise<CalibrationData> {
        const processedTestData = await Promise.all(
            data["test-data"].map(async (item) => {
                // First evaluate the question if it's a mathematical expression
                const evaluatedAnswer = this.evaluateExpression(item.question);
                
                if (!isNaN(evaluatedAnswer) && evaluatedAnswer !== item.answer) {
                    console.log(`Correcting answer for ${item.question}: ${item.answer} -> ${evaluatedAnswer}`);
                    item.answer = evaluatedAnswer;
                }

                // Then process any test field if present
                if (item.test) {
                    const { answer } = await this.openAIService.getResponse(item.test.q);
                    return {
                        ...item,
                        test: {
                            ...item.test,
                            a: answer
                        }
                    };
                }
                return item;
            })
        );

        return {
            ...data,
            "test-data": processedTestData
        };
    }
} 