import { GoogleOauthUser, sequelize, User } from "../../../../db";
import { GoogleOauthUserModel, UserModel } from "../../../../db/models";

export const getGoogleUserByGoogleId = async (googleOAuthToken: string): Promise<GoogleOauthUserModel|null> => {

  return await GoogleOauthUser.findOne({
    where: { googleId: googleOAuthToken }
  });
}

export const insertUser = async (email: string, firstName: string, lastName: string, googleId: string): Promise<UserModel> => {
  
  const user = await sequelize.transaction(async (t) => {

    const user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      verified: true,
      isAdmin: false,
    }, { transaction: t });
  
    await GoogleOauthUser.create({
      userId: user.id!,
      googleId: googleId,
    }, { transaction: t });

    return user;
  });

  return user;
};

export const insertGoogleOAuth = async (userId: string, accessToken: string): Promise<void> => {
  
  await GoogleOauthUser.create({
    userId: userId,
    googleId: accessToken,
  });
};
