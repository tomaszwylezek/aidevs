import OpenAI from "openai";
import { SYSTEM_MESSAGE } from "../config/openai.config";
import { getEnvVariables } from "../../../env";
import { TokenUsage } from "../../../types/api.types";

interface ResponseData {
    answer: string;
    usage: TokenUsage;
}

export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: getEnvVariables().openAIApiKey,
        });
    }

    async getResponse(prompt: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_MESSAGE,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                model: "gpt-4o-mini",
                temperature: 0.1,
            });

            const answer = response.choices[0]?.message?.content;

            if (!answer) {
                throw new Error('No answer received from OpenAI');
            }

            console.log('Token usage:', {
                prompt_tokens: response.usage?.prompt_tokens || 0,
                completion_tokens: response.usage?.completion_tokens || 0,
                total_tokens: response.usage?.total_tokens || 0
            });

            return answer.trim();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`OpenAI API error: ${error.message}`);
            }
            throw error;
        }
    }
}
