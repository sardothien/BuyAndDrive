import { User } from "../../../db";

export const updateUserStatusToVerified = async (userId: string): Promise<void> => {
  await User.update({ 
    verified: true
  }, {
    where: { id: userId } 
  });
};
