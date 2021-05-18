import { Request, Response } from 'express';
import { sendResponse, InternalServerErrorResponse, InvalidReqStructureResponse, Statuses, InvalidReqContentResponse } from "../ApiResponse";
import { insertCar } from "./db";
import { NewCarBodyType, NewCarBodySchema } from "./types";
import { validateReqType } from "../../types";
import { sendCarWaitingApprovalMail } from '../../mailer';
import * as tokens from '../../auth/tokens';
import { getUserById } from '../../db/interfaces/users';
import { uploadFile } from '../uploadImage/uploadFile';
export const newCar = async (req: Request, res: Response): Promise<void> => {

  const reqBody: NewCarBodyType = req.body;

  if (!validateReqType(reqBody, NewCarBodySchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  const token = req.headers['authorization'];
  const userId = tokens.verifyAccessToken(token as string);
 // const images = req.files.map((file: any) => { return file["path"] })
  //if (images.length == 0)
  //{
  //  return sendResponse(res, InvalidReqStructureResponse);  
  //}
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
      [],
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
export const putCarImage = async (req: any, res: Response): Promise<void> => {
  try {
    console.log("NESTO!!!!!!!!!!!!");
    await uploadFile(req, res);
    console.log(req.file);
    res.status(Statuses.ok).send({ msg:'Uploaded successfully!'});
  }
  catch (err){
    console.log(err.message);
    return sendResponse(res, InternalServerErrorResponse);
  }
}

