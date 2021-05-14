import { Request, Response } from 'express';
import { getCarById, getUserById } from "../../db";
import { sendCarBoughtMail } from '../../mailer';
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { patchSoldCar } from "./db";
import * as tokens from '../../auth/tokens';

export const buyCar = async (req: Request, res: Response): Promise<void> => {

  const carId = req.params.carId;
  if(!carId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {

    const car = await getCarById(carId);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }

    const token = req.headers['authorization'];
    const userId = tokens.verifyAccessToken(token as string);
    if(!userId) {
      return sendResponse(res, InternalServerErrorResponse);
    }

    if(car.userId === userId || car.sold || !car.approved) {
      return sendResponse(res, InternalServerErrorResponse);
    }

    await patchSoldCar(carId);
    
    const user = await getUserById(userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

    sendCarBoughtMail(user.email, car.make, car.model);

    res.status(Statuses.ok).send({ msg: "sold status updated" });

  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};