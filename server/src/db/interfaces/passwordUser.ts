import { PasswordUser } from "../db";

export const getPasswordByUserId = async (userId: string): Promise<string | null> => {

  const pass = await PasswordUser.findByPk(userId);
  
  if (!pass) return null;
  return pass.pwdHash;
};
