import { PasswordUser } from "../../../db";

export const createPassword = async (userId: string, pwdHash: string): Promise<void> => {
  await PasswordUser.create({
    userId: userId,
    pwdHash: pwdHash
  });
};

export const updatePassword = async (userId: string, pwdHash: string): Promise<void> => {

  await PasswordUser.update({
    pwdHash: pwdHash
  }, 
  { where: { userId: userId } });
};
