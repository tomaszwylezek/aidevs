declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AI_DEVS_API_KEY: string;
      OPENAI_API_KEY: string;
      S01E01_BASE_URL: string;
      S01E01_USERNAME: string;
      S01E01_PASSWORD: string;
      POLIGON_VERIFY_URL: string;
      POLIGON_DATA_URL: string;
    }
  }
}

export {}; 




