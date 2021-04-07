import { sequelize, PasswordUser, User } from "../../../db";
import { UserModel } from "../../../db/models";

export const insertUser = async (email: string, firstName: string, lastName: string, pwdHash: string): Promise<UserModel> => {
  
  const user = await sequelize.transaction(async (t) => {

    const user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      verified: false,
      isAdmin: false,
    }, { transaction: t });
  
    await PasswordUser.create({
      userId: user.id!,
      pwdHash: pwdHash,
    }, { transaction: t });

    return user;
  });

  return user;
};
