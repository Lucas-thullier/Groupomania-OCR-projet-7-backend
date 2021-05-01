const request = require("supertest");
const app = require("../app");

const user = {
  username: "jeanMi",
  password: "Werddfg!457",
  email: "test@test.fr",
};
const badPassword = "Werddfg457";

describe("User signup Endpoint", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/user/signup").send({
      username: user.username,
      password: user.password,
      email: user.email,
    });

    expect(res.statusCode).toEqual(201);
  });

  it("should error cause password not secure", async () => {
    const res = await request(app).post("/user/signup").send({
      username: user.username,
      password: badPassword,
      email: user.email,
    });

    expect(res.statusCode).toEqual(401);
  });

  it("should error cause no password given", async () => {
    const res = await request(app).post("/user/signup").send({
      username: user.username,
      email: user.email,
      password: "",
    });

    expect(res.statusCode).toEqual(401);
  });
});

describe("User login Endpoint", () => {
  it("should login user x", async () => {
    const res = await request(app).post("/user/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toEqual(200);
  });

  it("should return bad password", async () => {
    const res = await request(app).post("/user/login").send({
      email: user.email,
      password: badPassword,
    });

    expect(res.statusCode).toEqual(401);
  });
});

describe("User by id Endpoint", () => {
  it(`should get User : ${user.username} `, async () => {
    const res = await request(app).get("/user/1").send();

    expect(res.statusCode).toEqual(200);
  });
});

// describe("User search Endpoint", () => {
//   it("should ", async () => {
//     const res = await request(app).get("/user/login").send({
//       searchContent: "qw",
//     });

//     expect(res.statusCode).toEqual(200);
//   });
// });
