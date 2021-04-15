import { Cart } from "../../db";

export const getCartCarsIdByUserId = async (userId: string): Promise<string[]> => {
  const cars = await Cart.findAll({
    attributes: ['carId'],
    where: { userId: userId }
  });

  return cars.map((cart): string => { return cart.carId });
};

export const getCartUsersIdByCarId = async (carId: string): Promise<string | null> => { 
  const user = await Cart.findOne({
    attributes: ['userId'],
    where: { carId: carId }
  });

  if(!user) 
    return null;
    
  return user.id as string;
};