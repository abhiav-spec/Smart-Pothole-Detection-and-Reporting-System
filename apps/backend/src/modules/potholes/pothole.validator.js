import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.enum(
    ["REPORTED", "VERIFIED", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "REJECTED"],
    { errorMap: () => ({ message: "Invalid pothole status value" }) }
  ),
  reason: z.string().optional(),
  authorityId: z.string().optional()
});
