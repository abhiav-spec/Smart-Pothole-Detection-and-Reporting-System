import request from "supertest";
import app from "../../src/app.js";

describe("Dashboard API Integration Tests", () => {
  const timestamp = Date.now();
  const adminUser = {
    name: "Jest Dashboard Admin",
    email: `jest_dash_admin_${timestamp}@example.com`,
    password: "AdminPassword123!",
    role: "ADMIN"
  };

  let adminToken = "";

  beforeAll(async () => {
    const adminRes = await request(app).post("/api/auth/register").send(adminUser);
    adminToken = adminRes.body.data.accessToken;
  });

  test("GET /api/dashboard/map - should be publicly accessible and return map markers array", async () => {
    const res = await request(app).get("/api/dashboard/map");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/dashboard/recent - should be publicly accessible and return recent potholes array", async () => {
    const res = await request(app).get("/api/dashboard/recent");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/dashboard/overview - should require authentication and return stats object for ADMIN", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("totalPotholes");
    expect(res.body.data).toHaveProperty("byStatus");
    expect(res.body.data).toHaveProperty("bySeverity");
  });

  test("GET /api/dashboard/authorities - should require authentication and return authority performance array for ADMIN", async () => {
    const res = await request(app)
      .get("/api/dashboard/authorities")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
