export const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);

export const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));
