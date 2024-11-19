import { OpenAIService } from './services/openai.service';
import { SubmitService } from './services/submit.service';
import { VerifyService } from './services/verify.service';

export async function main() {
    const openAIService = new OpenAIService();
    const verifyService = new VerifyService();
    const submitService = new SubmitService();

    try {
        // Get initial prompt
        const prompt = await verifyService.getInitialPrompt();
        console.log('Received prompt:', prompt);

        // Get response from OpenAI
        const response = await openAIService.getResponse(prompt);
        console.log('OpenAI response:', response);

        // Submit the answer and get response
        const submitResponse = await submitService.submit(response, verifyService.getCurrentMsgId());
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