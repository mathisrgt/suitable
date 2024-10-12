import { EnokiClient } from '@mysten/enoki';

if (process.env.NEXT_PUBLIC_ENOKI_PRIVATE_KEY === undefined)
    throw new Error('NEXT_PUBLIC_ENOKI_PRIVATE_KEY is undefined');
export const enoki_private_key = process.env.NEXT_PUBLIC_ENOKI_PRIVATE_KEY;

export const enokiClient = new EnokiClient({
    apiKey: enoki_private_key,
});