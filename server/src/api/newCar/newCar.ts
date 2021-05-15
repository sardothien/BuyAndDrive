import { Request, Response } from 'express';
import { sendResponse, InternalServerErrorResponse, InvalidReqStructureResponse, Statuses, InvalidReqContentResponse } from "../ApiResponse";
import { insertCar } from "./db";
import { NewCarBodyType, NewCarBodySchema } from "./types";
import { validateReqType } from "../../types";
import { sendCarWaitingApprovalMail } from '../../mailer';
import * as tokens from '../../auth/tokens';
import { getUserById } from '../../db/interfaces/users';

export const newCar = async (req: any, res: Response): Promise<void> => {

  const reqBody: NewCarBodyType = req.body;

  if (!validateReqType(reqBody, NewCarBodySchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  const token = req.headers['authorization'];
  const userId = tokens.verifyAccessToken(token as string);
  const images = req.files.map((file: any) => { return file["path"] })
  if (!userId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }
  try {
  
    const car = await insertCar(
      userId,
      reqBody.type,
      reqBody.make,
      reqBody.model,
      reqBody.year,
      reqBody.mileage,
      reqBody.engineSize,
      reqBody.fuelType,
      reqBody.emissionClass,
      reqBody.horsepower,
      reqBody.transmission,
      reqBody.numberOfDoors,
      reqBody.numberOfSeats,
      reqBody.bootCapacity,
      reqBody.AC,
      reqBody.body,
      reqBody.color,
      reqBody.damage,
      reqBody.registeredUntil,
      reqBody.country,
      reqBody.price,
      images,
    );

    if(!car)
      res.status(Statuses.internalServerError).send({ msg: 'car cannot be added' });
    else
      res.status(Statuses.ok).send({ msg: 'new car added: ' + car.id });

    const user = await getUserById(userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

    sendCarWaitingApprovalMail(user.email, reqBody.make, reqBody.model);
    
  } catch(err) {
    console.log(err.message);
    return sendResponse(res, InternalServerErrorResponse);
  }
};

