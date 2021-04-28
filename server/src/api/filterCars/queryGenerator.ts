import { Request } from 'express';
import { Op } from 'sequelize'
export const generateQuery = async (req: Request): Promise<void> => {
  let filterObject: any = {};
  const numAttr = ['price', 'bootCapacity', 'numberOfDoors', 'numberOfSeats', 'horsepower', 'year', 'mileage', 'engineSize'];
  const strAttr = ['make', 'model', 'country', 'type', 'fuelType', 'emissionClass', 'transmission', 'body', 'color', 'damage'];
  for (let propName of numAttr) {
    let upLimit = (req.query[propName + "_to"]) ? Number(req.query[propName + "_to"]) : undefined;
    let downLimit = (req.query[propName + "_from"]) ? Number(req.query[propName + "_from"]) : undefined;
    if (!downLimit && upLimit)
      filterObject[propName] = { [Op.lte]: [upLimit] };
    if (downLimit && !upLimit)
      filterObject[propName] = { [Op.gte]: [downLimit] };
    if (downLimit && upLimit)
      filterObject[propName] = { [Op.between]: [downLimit, upLimit] };
  }
  for (let propName of strAttr) {
    if (req.query[propName])
    {
      filterObject[propName] = req.query[propName];
    }
  }
  filterObject['approved'] = true;
  return filterObject;
}