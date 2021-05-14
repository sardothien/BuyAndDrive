import { Request, Response } from 'express'
import { getAllFavourites } from './db'
import {  getUserById } from "../../db";
import { sendResponse, InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
export const getFavourites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId;
    if(!userId) {
      return sendResponse(res, InvalidReqStructureResponse);
    }

    const user = await getUserById(userId);
    if(!user){
      return sendResponse(res, InvalidReqContentResponse);
    }

    const favourites = await getAllFavourites(userId);
    res.status(Statuses.ok).send({favourites});
  }
  catch (err){
    return sendResponse(res, InternalServerErrorResponse);
  }
}