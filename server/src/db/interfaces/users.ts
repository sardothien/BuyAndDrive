import { User } from "../../db";
import { UserModel } from "../models";

export const getUserById = async (userId: string): Promise<UserModel|null> => {
  
  return await User.findOne({
    where: { id: userId }
  });
};

export const getUserIdByEmail = async (email: string): Promise<string | null> => {

  const user = await User.findOne({ 
    attributes: ['id'],
    where: { email: email } 
  });

  if (!user) return null;
  return user.id as string;
};
