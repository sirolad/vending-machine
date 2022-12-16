import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_OR_ROUNDS));
};

export const isValidPassword = async (password: string): Promise<boolean> => {
  return await bcrypt.compare(password, await hashPassword(password));
};