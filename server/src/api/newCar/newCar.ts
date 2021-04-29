import { Request, Response } from 'express';
import { sendResponse, InternalServerErrorResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { insertCar } from "./db";
import { NewCarBodyType, NewCarBodySchema } from "./types";
import { validateReqType } from "../../types";
import { sendCarWaitingApprovalMail } from '../../mailer';

export const newCar = async (req: Request, res: Response): Promise<void> => {

  const reqBody: NewCarBodyType = req.body;

  if (!validateReqType(reqBody, NewCarBodySchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
  
    const car = await insertCar(
      reqBody.email,
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
      reqBody.images
    );

    sendCarWaitingApprovalMail(reqBody.email, reqBody.make, reqBody.model);
    
    if(!car)
      res.status(Statuses.internalServerError).send({ msg: 'wrong user email' });
    else
      res.status(Statuses.ok).send({ msg: 'new car added: ' + car.id });
  } catch(err) {
    console.log(err.message);
    return sendResponse(res, InternalServerErrorResponse);
  }
};

