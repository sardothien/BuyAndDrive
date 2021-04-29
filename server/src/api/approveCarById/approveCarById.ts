import { Request, Response } from 'express';
import { getCarById, getUserById } from "../../db";
import { sendCarApprovedMail } from '../../mailer';
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { patchIsApprovedCar } from "./db";

export const approveCarById = async (req: Request, res: Response): Promise<void> => {

  const carId = req.params.carId;
  if(!carId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {

    const car = await getCarById(carId);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }

    await patchIsApprovedCar(carId);

    const user = await getUserById(car.userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

    sendCarApprovedMail(user.email, car.make, car.model);

    res.status(Statuses.ok).send({ msg: "approved status updated" });

  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};