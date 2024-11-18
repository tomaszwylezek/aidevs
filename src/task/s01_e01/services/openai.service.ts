import OpenAI from 'openai';
import { getEnvVariables } from '../../../env';
import { SYSTEM_MESSAGE } from '../config/openai.config';
import { TokenUsage } from '../../../types/api.types';

interface AnswerResponse {
    answer: string;
    usage: TokenUsage;
}

export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        const env = getEnvVariables();
        this.openai = new OpenAI({
            apiKey: env.openAIApiKey,
        });
    }

    async getAnswer(question: string): Promise<AnswerResponse> {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_MESSAGE
                    },
                    {
                        role: "user",
                        content: question
                    }
                ],
                model: "gpt-4o-mini",
                temperature: 0.1,
            });

            const answer = completion.choices[0]?.message?.content;

            if (!answer) {
                throw new Error('No answer received from OpenAI');
            }

            return {
                answer: answer.trim(),
                usage: {
                    prompt_tokens: completion.usage?.prompt_tokens || 0,
                    completion_tokens: completion.usage?.completion_tokens || 0,
                    total_tokens: completion.usage?.total_tokens || 0
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`OpenAI API error: ${error.message}`);
            }
            throw error;
        }
    }
} 