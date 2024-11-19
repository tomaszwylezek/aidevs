import { OpenAIService } from '../../services/openai.service';
import { SubmitService } from './services/submit.service';
import { VerifyService } from './services/verify.service';
import { SYSTEM_MESSAGE } from './config/openai.config';

export async function main() {
    const openAIService = new OpenAIService(SYSTEM_MESSAGE);
    const verifyService = new VerifyService();
    const submitService = new SubmitService();

    try {
        // Get initial prompt
        const prompt = await verifyService.getInitialPrompt();
        console.log('Received prompt:', prompt);

        // Get response from OpenAI
        const { answer, usage } = await openAIService.getResponse(prompt);
        console.log('OpenAI response:', answer);
        console.log('Token usage:', {
            prompt_tokens: usage.prompt_tokens,
            completion_tokens: usage.completion_tokens,
            total_tokens: usage.total_tokens
        });

        // Submit the answer and get response
        const submitResponse = await submitService.submit(answer, verifyService.getCurrentMsgId());
        console.log('Server response:', submitResponse);
    } catch (error) {
        console.error('Error in main:', error);
        throw error;
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error('Application error:', error);
        process.exit(1);
    });
}