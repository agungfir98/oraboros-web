import { get } from 'env-var';
import { loadEnv } from './env';

loadEnv();

export const getRequiredEnv = (env: string) => get(env).required();

export const env = {
  get supabaseJWTSecret() {
    return getRequiredEnv('SUPABASE_JWT_SECRET').asString();
  },
  get supabaseURL() {
    return getRequiredEnv('SUPABASE_URL').asString();
  },
  get supabaseAnonKey() {
    return getRequiredEnv('SUPABASE_ANON_KEY').asString();
  },
};
