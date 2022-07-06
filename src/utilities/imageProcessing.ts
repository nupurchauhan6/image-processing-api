import sharp from "sharp";
import path from "path";
import NodeCache from "node-cache";

interface IResonse {
  body: string;
  statusCode: number;
}

const imageCache = new NodeCache();

export const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<IResonse> => {
  try {
    const newName = [path.parse(filename).name, width, height].join("_");
    const cachedImage = imageCache.get(newName);
    if (cachedImage) {
      return {
        body: `${newName}.png`,
        statusCode: 200,
      };
    }
    await sharp(path.join("assets", "images", filename))
      .resize({
        width,
        height,
      })
      .toFile(`assets/images/${newName}.png`)
      .then((data) => {
        imageCache.set(newName, data);
      });
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
): Promise<IResonse> => {
  try {
    const newName = [path.parse(filename).name, width, height, left, top].join(
      "_"
    );
    const cachedImage = imageCache.get(newName);
    if (cachedImage) {
      return {
        body: `${newName}.png`,
        statusCode: 200,
      };
    }
    await sharp(path.join("assets", "images", filename))
      .extract({ width, height, left, top })
      .toFile(`assets/images/${newName}.png`)
      .then((data) => {
        imageCache.set(newName, data);
      });
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
