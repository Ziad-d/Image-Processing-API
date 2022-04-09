import app from "../index";
import request from "supertest";

describe("GET /", () => {
   it("responds with 200", (done): void => {
      request(app).get("/").expect(200);
      done();
   });
});
