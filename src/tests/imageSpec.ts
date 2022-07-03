import express from "express";
import request from "request";

const correntResizeEndpoint =
  "http://localhost:3001/api/images/resize/?name=fjord.jpg&width=1000&height=500";

const correntCropEndpoint =
  "http://localhost:3001/api/images/crop/?name=encenadaport.jpg&width=1000&height=500&left=10&top=10";

const incorrentEndpoint =
  "http://localhost:3001/api/images/resize/?name=test.jpg&width=1000&height=500";

const notFoundEndpoint =
  "http://localhost:3001/api/images/?name=fjord.jpg&width=1000&height=500";

describe("Testing Images API", () => {
  it("should return 200 response code", (done) => {
    request.get(correntResizeEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("should return 200 response code", (done) => {
    request.get(correntCropEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("should return 500 response code", (done) => {
    request.get(incorrentEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(500);
      done();
    });
  });

  it("should return 404 response code", (done) => {
    request.get(notFoundEndpoint, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  });
});
