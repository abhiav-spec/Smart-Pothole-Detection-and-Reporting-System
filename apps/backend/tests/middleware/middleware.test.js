import request from "supertest";
import app from "../../src/app.js";

describe("Security & Middleware Integration Tests", () => {
  test("Helmet should attach X-Content-Type-Options: nosniff header", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  test("Request Tracing should attach automatic X-Request-ID starting with 'req-'", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toBeDefined();
    expect(res.headers["x-request-id"]).toMatch(/^req-/);
  });

  test("Request Tracing should preserve custom client X-Request-ID header", async () => {
    const customId = "trace-custom-999";
    const res = await request(app)
      .get("/api/health")
      .set("X-Request-ID", customId);
    
    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toBe(customId);
  });

  test("Validation middleware should return 400 Bad Request on invalid input", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "A", email: "invalid-email", password: "123" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Validation Error");
  });
});
