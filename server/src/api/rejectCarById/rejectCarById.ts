import { Request, Response } from 'express';
import { getCarById, getUserById } from "../../db";
import { sendCarRejectedMail } from '../../mailer';
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { deleteRejectedCar } from "./db";

export const rejectCarById = async (req: Request, res: Response): Promise<void> => {

  const carId = req.params.carId;
  const reason = req.params.reason;

  if(!carId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {

    const car = await getCarById(carId);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }

    const user = await getUserById(car.userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

    await deleteRejectedCar(carId);

    sendCarRejectedMail(user.email, car.make, car.model, reason);

    res.status(Statuses.ok).send({ msg: "car rejeceted and removed from db" });

  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};