import express from "express";

const request = require("request");

const correntEndpoint =
  "http://localhost:3001/api/images/?name=fjord.jpg&width=1000&height=500";

const incorrentEndpoint =
  "http://localhost:3001/api/images/?name=test.jpg&width=1000&height=500";

describe("Testing Images API", function () {
  it("should return 200 response code", function (done) {
    request.get(
      correntEndpoint,
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
});
