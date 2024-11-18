import dotenv from "dotenv";

interface EnvVariables {
  apiKey: string;
  openAIApiKey: string;
  s01e01: {
    baseUrl: string;
    username: string;
    password: string;
  },
  poligon: {
    verifyUrl: string;
    dataUrl: string;
  }
}

dotenv.config();

export const getEnvVariables = (): EnvVariables => {
  return {
    apiKey: process.env.AI_DEVS_API_KEY!,
    openAIApiKey: process.env.OPENAI_API_KEY!,
    s01e01: {
      baseUrl: process.env.S01E01_BASE_URL!,
      username: process.env.S01E01_USERNAME!,
      password: process.env.S01E01_PASSWORD!,
    },
    poligon: {
      verifyUrl: process.env.POLIGON_VERIFY_URL!,
      dataUrl: process.env.POLIGON_DATA_URL!,
    }
  };
};
