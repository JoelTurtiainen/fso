export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));
