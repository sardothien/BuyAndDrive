import { Car } from "../../../db";

export const deleteRejectedCar = async (carId: string): Promise<void> => {

  await Car.destroy({ where: { id: carId } });
};