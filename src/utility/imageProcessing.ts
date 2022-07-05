import sharp from "sharp";
import path from "path";

interface IResonse {
  body: string;
  statusCode: number;
}

export const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<IResonse> => {
  try {
    const newName = [path.parse(filename).name, width, height].join("_");
    await sharp(path.join("assets", "images", filename))
      .resize({
        width,
        height,
      })
      .toFile(`assets/images/${newName}.png`);
    return {
      body: `${newName}.png`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: error as string,
      statusCode: 500,
    };
  }
};

export const cropImage = async (
  filename: string,
  width: number,
  height: number,
  left: number,
  top: number
) => {
  try {
    const newName = [path.parse(filename).name, width, height, left, top].join(
      "_"
    );
    await sharp(path.join("assets", "images", filename))
      .extract({ width, height, left, top })
      .toFile(`assets/images/${newName}.png`);
    return {
      body: `${newName}.png`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: error as string,
      statusCode: 500,
    };
  }
};
