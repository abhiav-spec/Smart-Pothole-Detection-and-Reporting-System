import request from "supertest";
import app from "../../src/app.js";

describe("Potholes API Integration Tests", () => {
  const timestamp = Date.now();
  const adminUser = {
    name: "Jest Pothole Admin",
    email: `jest_potholes_admin_${timestamp}@example.com`,
    password: "AdminPassword123!",
    role: "ADMIN"
  };

  let adminToken = "";

  beforeAll(async () => {
    const adminRes = await request(app).post("/api/auth/register").send(adminUser);
    adminToken = adminRes.body.data.accessToken;
  });

  test("GET /api/potholes - should return paginated list of potholes with pagination object", async () => {
    const res = await request(app).get("/api/potholes?page=1&limit=5");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(5);
  });

  test("GET /api/potholes - should cap limit to maximum 100 when oversized limit requested", async () => {
    const res = await request(app).get("/api/potholes?limit=500");
    expect(res.status).toBe(200);
    expect(res.body.pagination.limit).toBe(100);
  });

  test("GET /api/potholes - should apply filter by status and severity", async () => {
    const res = await request(app).get("/api/potholes?status=REPORTED&severity=HIGH");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("PATCH /api/potholes/:id/status - should return 400 Bad Request for invalid status value", async () => {
    const res = await request(app)
      .patch("/api/potholes/non-existent-id/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "INVALID_STATUS_NAME" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("PATCH /api/potholes/:id/status - should return 404 Not Found for non-existent pothole ID", async () => {
    const res = await request(app)
      .patch("/api/potholes/00000000-0000-0000-0000-000000000000/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "VERIFIED" });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
