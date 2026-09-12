import request from "supertest";
import app from "../../src/app.js";

describe("Role-Based Access Control (RBAC) Integration Tests", () => {
  const timestamp = Date.now();
  
  const regularUser = {
    name: "Jest Regular User",
    email: `jest_rbac_user_${timestamp}@example.com`,
    password: "UserPassword123!",
    role: "USER"
  };

  const adminUser = {
    name: "Jest Admin User",
    email: `jest_rbac_admin_${timestamp}@example.com`,
    password: "AdminPassword123!",
    role: "ADMIN"
  };

  let userToken = "";
  let adminToken = "";

  beforeAll(async () => {
    const userRes = await request(app).post("/api/auth/register").send(regularUser);
    console.log("DEBUG userRes:", userRes.status, userRes.body);
    userToken = userRes.body?.data?.accessToken;

    const adminRes = await request(app).post("/api/auth/register").send(adminUser);
    adminToken = adminRes.body.data.accessToken;
  });

  test("GET /api/dashboard/overview - should return 401 Unauthorized without token", async () => {
    const res = await request(app).get("/api/dashboard/overview");
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("GET /api/dashboard/overview - should return 401 Unauthorized for malformed token", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", "Bearer invalid-jwt-token");
    expect(res.status).toBe(401);
  });

  test("GET /api/dashboard/overview - should return 403 Forbidden for USER role", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Forbidden");
  });

  test("GET /api/dashboard/overview - should return 200 OK for ADMIN role", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("totalPotholes");
  });
});
