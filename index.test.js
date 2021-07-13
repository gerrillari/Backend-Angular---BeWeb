const request = require("supertest");
const app = require("./index");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  // test("test de body dans root path", done => {
  //   request(app)
  //     .get("/")
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toBe("hello world");
  //       done();
  //     });
  // });
  // test("Test messages path", done => {
  //   request(app)
  //     .get("/messages")
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  // });
  // test("test de body dans messages path", done => {
  //   request(app)
  //     .get("/messages")
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);
  //       // expect(response.body.keys).toBe("id","from","to");
  //       //Si test liste vide
  //       // expect(response.statusCode).toBe(204);
  //       // expect(response.body).toBe([]);
  //       done();
  //     });
  // });
});

describe("Teeeh", () => {
  test("test de body dans root path", done => {
    request(app)
      .get("/")
      .expect(200,"hello world", done);
      });
});