import { Favourite } from "../../db";
export const getFavouriteCarsIdByUserId = async (userId: string): Promise<string[]> => {
  const cars = await Favourite.findAll({
    attributes: ['carId'],
    where: { userId: userId }
  });
  return cars.map((fav): string => { return fav.carId });
};
export const getUsersIdByFavouriteCarId = async (carId: string): Promise<string[]> => { 
  const users= await Favourite.findAll({
    attributes: ['userId'],
    where: { carId: carId }
  });

  return users.map((fav): string => { return fav.userId });
};