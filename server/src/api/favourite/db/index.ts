import { FavouriteModel } from "../../../db/models";
import { Favourite} from "../../../db";
export const insertFavourite = async (carId: string, userId: string): Promise<FavouriteModel> => {
  return await Favourite.create({
    carId: carId,
    userId: userId
  });
}
export const isExistsInFavourite = async (carId: string, userId: string): Promise<boolean>  => {
  const exists= await Favourite.findOne({
    where: {
      carId: carId,
      userId: userId
    }
  })
  if (exists!=null)
  {
    return true;
  }
  else
  {
    return false;
  }
}
export const deleteFavourite = async (carId: string, userId: string): Promise<Number> => {
  return await Favourite.destroy({ where: { carId: carId, userId: userId }});
}