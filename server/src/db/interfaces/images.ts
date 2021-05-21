import { Image } from "../../db";
import { ImageModel } from "../models";
export const getImagesPath = async (carId: string): Promise<string[]> => {
  const imagePath= await Image.findAll({
    attributes: ['imagePath'],
    where: { carId: carId }
  });
  return imagePath.map((img:ImageModel)=>{return img.imagePath});
};
