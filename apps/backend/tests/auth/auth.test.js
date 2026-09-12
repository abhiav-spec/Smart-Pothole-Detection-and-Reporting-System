import request from "supertest";
import app from "../../src/app.js";

describe("Authentication API Integration Tests", () => {
  const timestamp = Date.now();
  const testUser = {
    name: "Jest Auth User",
    email: `jest_user_${timestamp}@example.com`,
    password: "TestPassword123!",
    role: "USER"
  };

  let refreshToken = "";

  test("POST /api/auth/register - should successfully register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    console.log("DEBUG REGISTER RESPONSE:", res.status, res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email.toLowerCase());
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.refreshToken).toBeDefined();

    refreshToken = res.body.data.refreshToken;
  });

  test("POST /api/auth/register - should return 409 Conflict for duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("already exists");
  });

  test("POST /api/auth/login - should authenticate valid user credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
  });

  test("POST /api/auth/login - should return 401 Unauthorized for invalid password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword123!"
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("POST /api/auth/refresh - should issue new access token given valid refresh token", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
  });

  test("POST /api/auth/logout - should successfully logout", async () => {
    const res = await request(app)
      .post("/api/auth/logout");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
