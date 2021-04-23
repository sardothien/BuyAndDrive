import { Car } from "../../../db";

export const patchIsApprovedCar = async (carId: string): Promise<void> => {

  await Car.update({
    approved: true
  },
  { where: { id: carId } });
};