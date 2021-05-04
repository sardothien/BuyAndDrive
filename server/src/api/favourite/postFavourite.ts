import { Request, Response } from 'express'
import { insertFavourite,isExistsInFavourite } from './db'
import { getCarById, getUserById } from "../../db";
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
export const postFavourite = async (req: Request, res: Response): Promise<void> => {
  const carId = req.body.carId
  const userId = req.body.userId
  if (!carId || !userId) {
   
    return sendResponse(res, InvalidReqStructureResponse);
  }
  try {
    const car = await getCarById(carId);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }
    const user = await getUserById(userId);
    if (!user){
      return sendResponse(res, InvalidReqContentResponse);
    }
    const isExistsFav = await isExistsInFavourite(carId, userId)
    if (isExistsFav)
    {
      res.status(Statuses.ok).send({msg:'favourite already exists'})  
    }
    else
    {
      await insertFavourite(carId, userId);
      res.status(Statuses.ok).send({ msg: 'new favourite added: '});
    }
    
  }
  catch (err){
    return sendResponse(res, InternalServerErrorResponse);
  }
}