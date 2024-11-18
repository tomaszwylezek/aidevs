import { QuestionService } from './services/question.service';
import { OpenAIService } from './services/openai.service';
import { SubmitService } from './services/submit.service';

async function main() {
    try {
        console.log('Starting s01_e01 task...');
        
        // Get question from website
        const questionService = new QuestionService();
        const question = await questionService.fetchQuestion();
        console.log('Retrieved question:', question);

        // Get answer from OpenAI
        const openAIService = new OpenAIService();
        const { answer, usage } = await openAIService.getAnswer(question);
        console.log('OpenAI answer:', answer);
        console.log('Token usage:', {
            prompt_tokens: usage.prompt_tokens,
            completion_tokens: usage.completion_tokens,
            total_tokens: usage.total_tokens
        });

        // Submit the answer
        const submitService = new SubmitService();
        return await submitService.submitAnswer(answer);
    } catch (error) {
        console.error('Error in s01_e01 task:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

export { main }; 