if (process.env.NEXT_PUBLIC_ENOKI_PUBLIC_KEY === undefined)
    throw new Error('NEXT_PUBLIC_ENOKI_PUBLIC_KEY is undefined');
export const enoki_public_key = process.env.NEXT_PUBLIC_ENOKI_PUBLIC_KEY;

// if (process.env.NEXT_PUBLIC_ENOKI_PRIVATE_KEY === undefined)
//     throw new Error('NEXT_PUBLIC_ENOKI_PRIVATE_KEY is undefined');
// export const enoki_private_key = process.env.NEXT_PUBLIC_ENOKI_PRIVATE_KEY;