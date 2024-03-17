export const wait = async (millisec: number) =>
  await new Promise((resolve) => setTimeout(resolve, millisec));
