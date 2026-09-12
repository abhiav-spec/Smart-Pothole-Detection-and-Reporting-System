import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} from "../../src/utils/token.js";

describe("Token Utility Unit Tests", () => {
  const mockUser = {
    id: "user-uuid-12345",
    email: "testuser@example.com",
    role: "USER"
  };

  test("should generate and verify a valid access token", () => {
    const token = generateAccessToken(mockUser);
    expect(typeof token).toBe("string");

    const decoded = verifyAccessToken(token);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  test("should generate and verify a valid refresh token", () => {
    const refreshToken = generateRefreshToken(mockUser);
    expect(typeof refreshToken).toBe("string");

    const decoded = verifyRefreshToken(refreshToken);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.role).toBe(mockUser.role);
  });

  test("should throw error when verifying invalid or malformed token", () => {
    expect(() => verifyAccessToken("invalid.token.str")).toThrow();
  });
});
