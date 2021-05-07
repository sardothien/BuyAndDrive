import e, { Request, Response } from 'express'
import { deleteFavourite } from './db'
import { getCarById, getUserById } from "../../db";
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
export const delFavourite = async (req: Request, res: Response): Promise<void> => {
  try {
    const carId = req.params.carId;
    const userId = req.params.userId;
    if(!carId) {
      return sendResponse(res, InvalidReqStructureResponse);
    }
    if(!userId) {
      return sendResponse(res, InvalidReqStructureResponse);
    }
    const car = await getCarById(carId);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }

    const user = await getUserById(userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

   const numberDeleted=await deleteFavourite(carId, userId);
    if (numberDeleted>0)
      res.status(Statuses.ok).send({ msg: "Favourite removed from database successfully" });
    else
      res.status(Statuses.ok).send({ msg: "That car is not favourite for that user" });
  }
  catch (err){
    return sendResponse(res, InternalServerErrorResponse);
  }
}