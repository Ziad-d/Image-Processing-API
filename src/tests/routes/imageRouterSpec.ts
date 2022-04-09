import request from "supertest";
import fs from "fs/promises";
import path from "path";
import app from "../../index";
import { Stats } from "fs";

describe("GET /api/images", () => {
   it("tests if called without parameters, responds with 400", (done) => {
      request(app).get("/api/images").expect(400);
      done();
   });

   it("tests if called with a missing parameter, responds with 400 ", (done) => {
      request(app).get("/api/images?filename=test&height=100").expect(400);
      done();
   });

   it("tests if called correctly but image does not exist, responds with 404", (done) => {
      request(app)
         .get("/api/images?filename=test&height=100&width=100")
         .expect(404);
      done();
   });

   it("tests if called correctly and image exist, responds with 200", (done) => {
      request(app)
         .get("/api/images?filename=fjord&height=100&width=100")
         .expect(200);
      done();
   });

   it("test created a thumb", (done) => {
      request(app)
         .get("/api/images?filename=fjord&height=100&width=100")
         .then(() => {
            fs.stat(
               path.resolve(
                  __dirname,
                  "../../../assets/thumb/fjord-100x100.jpg"
               )
            ).then((fileStat: Stats) => expect(fileStat).not.toBeNull());
            done();
         });
   });
});
