if (process.env.NEXT_PUBLIC_SPONSO_PRIVATE_KEY === undefined)
    throw new Error('NEXT_PUBLIC_SPONSO_PRIVATE_KEY is undefined');
export const sponso_private_key = process.env.NEXT_PUBLIC_SPONSO_PRIVATE_KEY;