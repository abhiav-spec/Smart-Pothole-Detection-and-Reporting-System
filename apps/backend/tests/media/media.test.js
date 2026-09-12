import request from "supertest";
import app from "../../src/app.js";

describe("Media Upload API Integration Tests", () => {
  test("POST /api/media/upload - should return 400 Bad Request if no file attached", async () => {
    const res = await request(app)
      .post("/api/media/upload")
      .field("latitude", "28.6139")
      .field("longitude", "77.2090");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("No file uploaded");
  });

  test("POST /api/media/upload - should return 400 Bad Request if GPS coordinates are invalid or missing", async () => {
    const buffer = Buffer.from("dummy image content");
    const res = await request(app)
      .post("/api/media/upload")
      .attach("file", buffer, "test_pothole.jpg")
      .field("latitude", "invalid_lat")
      .field("longitude", "77.2090");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Latitude and longitude must be valid numbers");
  });
});
