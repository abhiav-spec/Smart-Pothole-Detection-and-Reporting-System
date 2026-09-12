/**
 * Calculates severity level and max confidence from AI detection results.
 * @param {Array} detections - Array of detection objects from YOLOv8
 * @returns {{ severity: "LOW"|"MEDIUM"|"HIGH"|"CRITICAL", maxConfidence: number }}
 */
export const calculateSeverity = (detections = []) => {
  if (!detections || detections.length === 0) {
    return { severity: "LOW", maxConfidence: 0 };
  }

  let maxAreaRatio = 0;
  let maxConfidence = 0;

  for (const det of detections) {
    if (det.confidence > maxConfidence) {
      maxConfidence = det.confidence;
    }

    if (det.bbox && typeof det.bbox.x1 === "number" && typeof det.bbox.x2 === "number" &&
        typeof det.bbox.y1 === "number" && typeof det.bbox.y2 === "number") {
      const width = Math.abs(det.bbox.x2 - det.bbox.x1);
      const height = Math.abs(det.bbox.y2 - det.bbox.y1);
      const area = width * height;

      // Assuming normalized 640x640 frame area reference
      const frameArea = 640 * 640;
      const ratio = area / frameArea;

      if (ratio > maxAreaRatio) {
        maxAreaRatio = ratio;
      }
    }
  }

  // Determine base severity from maxAreaRatio
  let severity = "LOW";
  if (maxAreaRatio >= 0.30) {
    severity = "CRITICAL";
  } else if (maxAreaRatio >= 0.15) {
    severity = "HIGH";
  } else if (maxAreaRatio >= 0.05) {
    severity = "MEDIUM";
  }

  // Escalation factor: if high number of detections (> 3), escalate severity 1 step
  if (detections.length > 3) {
    if (severity === "LOW") severity = "MEDIUM";
    else if (severity === "MEDIUM") severity = "HIGH";
    else if (severity === "HIGH") severity = "CRITICAL";
  }

  return { severity, maxConfidence };
};
