import supertest from "supertest";
import app from "../index";
import { resizeImage, cropImage } from "../utilities/imageProcessing";

const request = supertest(app);

const correntResizeEndpoint =
  "http://localhost:3001/api/images/resize/?name=fjord.jpg&width=1000&height=500";

const correntCropEndpoint =
  "http://localhost:3001/api/images/crop/?name=encenadaport.jpg&width=1000&height=500&left=10&top=10";

const incorrentEndpoint =
  "http://localhost:3001/api/images/resize/?name=test.jpg&width=1000&height=500";

const notFoundEndpoint =
  "http://localhost:3001/api/images/?name=fjord.jpg&width=1000&height=500";

describe("Testing Image Processing API", () => {
  it("should return 200 response code", () => {
    request.get(correntResizeEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
    });
  });

  it("should return 200 response code", () => {
    request.get(correntCropEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
    });
  });

  it("should return 500 response code", () => {
    request.get(incorrentEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(500);
    });
  });

  it("should return 404 response code", () => {
    request.get(notFoundEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(404);
    });
  });
});

const testFilePath = "fjord.jpg";
const testWidth = 1000;
const testHeight = 500;
const testLeft = 50;
const testTop = 10;

describe("Testing Image Processing Utilities", () => {
  it("should not throw an error for resizing image", () => {
    expect(async () => {
      await resizeImage(testFilePath, testWidth, testHeight);
    }).not.toThrow();
  });

  it("should not throw an error for cropping image", () => {
    expect(async () => {
      await cropImage(testFilePath, testWidth, testHeight, testLeft, testTop);
    }).not.toThrow();
  });
});
