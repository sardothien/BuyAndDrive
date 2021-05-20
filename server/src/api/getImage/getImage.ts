import { InternalServerErrorResponse, sendResponse, Statuses,InvalidReqContentResponse } from '../ApiResponse';
import { Request, Response } from 'express';
import { getImagesPath } from '../../db/interfaces/images'
import { getCarById } from "../../db";
import * as path from 'path';

export const getImagesPathByCarId = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const carId = req.query.carId;
    const car = await getCarById(carId as string);
    if (!car){
      return sendResponse(res, InvalidReqContentResponse);
    }
    const imagesPath:string[] = await getImagesPath(carId as string);
    res.status(Statuses.ok).send(imagesPath);
    
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
export const getImage = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const reqPath: string = req.query.path as string;
    if (!reqPath.startsWith('uploads/'))
      return sendResponse(res, InvalidReqContentResponse);
    const imagePath = path.join(process.cwd(), reqPath);
    res.sendFile(imagePath as string);
    
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
}
