/**
 * Sanitizes and parses query parameters for pothole list requests.
 * @param {Object} query - Express req.query object
 * @returns {Object} Parsed filter, pagination, and sorting options
 */
export const parsePotholeQueryParams = (query) => {
  // 1. Pagination
  const rawPage = parseInt(query.page, 10);
  const page = !isNaN(rawPage) && rawPage >= 1 ? rawPage : 1;

  const rawLimit = parseInt(query.limit, 10);
  let limit = !isNaN(rawLimit) && rawLimit >= 1 ? rawLimit : 20;
  if (limit > 100) limit = 100; // Cap max limit at 100

  const skip = (page - 1) * limit;

  // 2. Filters
  const where = {};

  if (query.status) {
    const validStatuses = ["REPORTED", "VERIFIED", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "REJECTED"];
    if (validStatuses.includes(query.status.toUpperCase())) {
      where.status = query.status.toUpperCase();
    }
  }

  if (query.severity) {
    const validSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    if (validSeverities.includes(query.severity.toUpperCase())) {
      where.severity = query.severity.toUpperCase();
    }
  }

  if (query.authorityId) {
    where.authorityId = String(query.authorityId);
  }

  // Date Range Filtering (Inclusive end of day)
  if (query.startDate || query.endDate) {
    where.createdAt = {};
    if (query.startDate) {
      const start = new Date(query.startDate);
      if (!isNaN(start.getTime())) {
        start.setHours(0, 0, 0, 0);
        where.createdAt.gte = start;
      }
    }
    if (query.endDate) {
      const end = new Date(query.endDate);
      if (!isNaN(end.getTime())) {
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
  }

  // Search by description or ID
  if (query.search && typeof query.search === "string" && query.search.trim() !== "") {
    const searchTerm = query.search.trim();
    where.OR = [
      { id: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } }
    ];
  }

  // 3. Sorting
  const validSortFields = ["createdAt", "status", "severity"];
  const sortBy = validSortFields.includes(query.sortBy) ? query.sortBy : "createdAt";

  const sortOrder = query.sortOrder && query.sortOrder.toLowerCase() === "asc" ? "asc" : "desc";
  const orderBy = { [sortBy]: sortOrder };

  return {
    page,
    limit,
    skip,
    where,
    orderBy
  };
};
