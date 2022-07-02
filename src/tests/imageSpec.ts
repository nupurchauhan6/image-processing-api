import express from "express";

const request = require("request");

const correntResizeEndpoint =
  "http://localhost:3001/api/images/resize/?name=fjord.jpg&width=1000&height=500";

const correntCropEndpoint =
  "http://localhost:3001/api/images/crop/?name=encenadaport.jpg&width=1000&height=500&left=10&top=10";

const incorrentEndpoint =
  "http://localhost:3001/api/images/resize/?name=test.jpg&width=1000&height=500";

const notFoundEndpoint =
  "http://localhost:3001/api/images/?name=fjord.jpg&width=1000&height=500";

describe("Testing Images API", function () {
  it("should return 200 response code", function (done) {
    request.get(
      correntResizeEndpoint,
      function (error: string, response: express.Response) {
        expect(response.statusCode).toEqual(200);
        done();
      }
    );
  });

  it("should return 200 response code", function (done) {
    request.get(
      correntCropEndpoint,
      function (error: string, response: express.Response) {
        expect(response.statusCode).toEqual(200);
        done();
      }
    );
  });

  it("should return 500 response code", function (done) {
    request.get(
      incorrentEndpoint,
      function (error: string, response: express.Response) {
        expect(response.statusCode).toEqual(500);
        done();
      }
    );
  });

  it("should return 404 response code", function (done) {
    request.get(
      notFoundEndpoint,
      function (error: string, response: express.Response) {
        expect(response.statusCode).toEqual(404);
        done();
      }
    );
  });
});
