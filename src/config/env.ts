declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      TINY_MCE_API_KEY: string;
      VITE_BASE_URL: string;
    }
  }
}

export default process.env;
