declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TINY_MCE_API_KEY: string;
            BASE_URL: string;
        }
    }
}

export default process.env;
