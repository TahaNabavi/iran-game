const bcrypt = require("bcrypt");

export const hash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10).then((hash: string) => hash);

export const verifyHash = async (
  password: string,
  hash: string
): Promise<boolean> => await bcrypt.compare(password, hash);
