import { getUserIdByEmail } from "../../../db";
import { validateReqType } from "../../../types";
import { InternalServerErrorResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../../ApiResponse";
import { getGoogleUserByGoogleId, insertGoogleOAuth, insertUser } from "./db";
import { GoogleOAuthReqType, GoogleOAuthReqSchema } from "./types";
import * as tokens from '../../../auth/tokens';
import { OAuth2Client } from "google-auth-library";
import { envVal } from '../../../envVal';
import { Request, Response } from "express";

export const googleOAuth = async(req: Request, res: Response): Promise<void> => {

  const reqBody: GoogleOAuthReqType = req.body;

  if (!validateReqType(reqBody, GoogleOAuthReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  // Verify the received token with Google
  const client = new OAuth2Client(envVal.googleClientId);
  const ticket = await client.verifyIdToken({
    idToken: reqBody.idToken,
    audience: envVal.googleClientId,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  }).catch((err) => {
    console.log(err);
    return null; 
  });

  if (!ticket) {
    return sendResponse(res, InternalServerErrorResponse);
  }
  
  const payload = ticket.getPayload();
  if (!payload ||
      !payload.sub ||
      !payload.email ||
      !payload.email_verified ||
      !payload.given_name ||
      !payload.family_name ||
      !payload.picture) {
    return sendResponse(res, InternalServerErrorResponse);
  }

  const googleId = payload.sub;

  try {
    const existingToken = await getGoogleUserByGoogleId(googleId);

    if (existingToken) {
      // Login 
      res.status(Statuses.ok).send({ token: tokens.generateAccessToken(existingToken.userId) });
      return;
    }

    const email = payload.email;

    const existingUserId = await getUserIdByEmail(email);

    if (existingUserId) {
      try {
        // Add Google OAuth to the existing user
        await insertGoogleOAuth(existingUserId, googleId);
        // Login
        res.status(Statuses.ok).send({ token: tokens.generateAccessToken(existingUserId) });
        return;
      } catch(err) {
        console.log(err);
        return sendResponse(res, InternalServerErrorResponse);
      }
    }

    const emailVerified = payload.email_verified;

    if (!emailVerified) {
      return sendResponse(res, InternalServerErrorResponse);
    }

    const firstName = payload.given_name;
    const lastName = payload.family_name;

    // Create new user with Google OAuth
    const user = await insertUser(
      email, 
      firstName, 
      lastName,
      googleId
    );
    // Login
    res.status(Statuses.ok).send({ token: tokens.generateAccessToken(user.id!), user: user.id, isAdmin: user.isAdmin, firstName: user.firstName, lastName: user.lastName });
  } catch(err) {
    console.log(err);
    return sendResponse(res, InternalServerErrorResponse);
  }
};
