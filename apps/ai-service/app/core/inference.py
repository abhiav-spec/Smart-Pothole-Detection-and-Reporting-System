from app.config import settings
from app.core.model import model_manager


def detect_image(image):
    model = model_manager.get_model()

    results = model(
        image,
        imgsz=settings.image_size,
        conf=settings.confidence_threshold
    )

    detections = []

    for result in results:
        if result.boxes is None:
            continue

        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "class_id": class_id,
                "confidence": confidence,
                "bbox": {
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2
                }
            })

    return {
        "detected": len(detections) > 0,
        "count": len(detections),
        "detections": detections
    }
