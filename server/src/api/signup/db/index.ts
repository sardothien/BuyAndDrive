import { sequelize, PasswordUser, User } from "../../../db";
import { UserModel } from "../../../db/models";

export const insertUser = async (email: string, firstName: string, lastName: string, pwdHash: string): Promise<UserModel> => {
  
  const user = await sequelize.transaction(async (t) => {

    const user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      verified: email === process.env.GMAIL_USER ? true : false,
      isAdmin: email === process.env.GMAIL_USER ? true : false,
    }, { transaction: t });
  
    await PasswordUser.create({
      userId: user.id!,
      pwdHash: pwdHash,
    }, { transaction: t });

    return user;
  });

  return user;
};
