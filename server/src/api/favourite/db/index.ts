import { FavouriteModel } from "../../../db/models";
import { Favourite} from "../../../db";
export const insertFavourite = async (carId: string, userId: string): Promise<FavouriteModel> => {
  return await Favourite.create({
    carId: carId,
    userId: userId
  });
}