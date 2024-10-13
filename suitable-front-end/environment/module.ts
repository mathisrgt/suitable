if (process.env.NEXT_PUBLIC_MODULE_ADDRESS === undefined)
    throw new Error('NEXT_PUBLIC_MODULE_ADDRESS is undefined');
export const module_address = process.env.NEXT_PUBLIC_MODULE_ADDRESS;