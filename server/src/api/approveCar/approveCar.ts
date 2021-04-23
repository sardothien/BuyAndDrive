import { Request, Response } from 'express';
import { getCarById } from "../../db";
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { patchIsApprovedCar } from "./db";

export const approveCar = async (req: Request, res: Response): Promise<void> => {

  const carId = req.params.carId;
  if(!carId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
    if (!await getCarById(carId)){
      return sendResponse(res, InvalidReqContentResponse);
    }

    await patchIsApprovedCar(carId);

    // TODO - send email that car is approved by admin

    res.status(Statuses.ok).send({ msg: "approved status updated" });

  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};