import { ApiResponse, InternalServerErrorResponse, InvalidReqStructureResponse, sendResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';
import { validateReqType } from '../../types';
import { getCarsIdByObject } from '../../db/interfaces/car'
import {CarModel, CarType, CarFuelType, CarEmissionClass, CarTransmission, CarBody, CarColor, CarDamage} from '../../db/models/CarC'
import {Op} from 'sequelize'
const InvalidFilterResponse: ApiResponse = {
  status: Statuses.badRequest,
  payload: { error: 'invalid filter cars information' }
}

export const filterCars = async(req: Request, res: Response): Promise<void> => {
  try {
    let filterObject: any = {}
    //Need refactoring
    const numAttr = ['price', 'bootCapacity', 'numberOfDoors', 'numberOfSeats', 'horsepower', 'year', 'mileage', 'engineSize']
    const strAttr = ['make', 'model', 'country']
    for (let propName of numAttr) {
      let upLimit = (req.query[propName+"_to"]) ? Number(req.query[propName+"_to"]):undefined
      let downLimit = (req.query[propName + "_from"]) ? Number(req.query[propName + "_from"]) : undefined
      if (!downLimit && upLimit)
        filterObject[propName] = { [Op.lte]: [upLimit] }
      if (downLimit && !upLimit)
        filterObject[propName] = { [Op.gte]: [downLimit] }
      if (downLimit && upLimit)
        filterObject[propName] = { [Op.between]: [downLimit,upLimit] }
    }
    for (let propName of strAttr) {
      if (req.query[propName])
      {
        filterObject[propName]=req.query[propName]
      }
    }
    const type=req.query["type"] as string in CarType?req.query["type"] as CarType:undefined;
    const fuelType = req.query["fuelType"] as string in CarFuelType
      ? req.query["fuelType"] as CarFuelType : undefined;
    const emissionClass = req.query["emissionClass"] as string in CarEmissionClass
      ? req.query["emissionClass"] as CarEmissionClass : undefined;
    const transmission = req.query["transmission"] as string in CarTransmission
      ? req.query["transmission"] as CarTransmission : undefined;
    const body = req.query["body"] as string in CarBody
      ? req.query["body"] as CarBody : undefined;
    const color = req.query["color"] as string in CarColor
      ? req.query["color"] as CarColor : undefined;
    const damage = req.query["damage"] as string in CarDamage
      ? req.query["damage"] as CarColor : undefined;
    const enumValues:any = {
      'type': type,
      'fuelType': fuelType,
      'emissionClass': emissionClass,
      'transmission': transmission,
      'body': body,
      'color': color,
      'damage': damage
    }
    for (let propName in enumValues)
    {
      if (enumValues[propName])
      {
        filterObject[propName]=enumValues[propName]
      }
      else
      {
        if (req.query[propName])
          res.status(Statuses.badRequest).send({});
      }
    }
    const cars = await getCarsIdByObject(filterObject);
    res.status(Statuses.ok).send(cars);
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
