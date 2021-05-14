import { Car } from "../../../db";

export const patchSoldCar = async (carId: string): Promise<void> => {

  await Car.update({
    sold: true
  },
  { where: { id: carId } });
};