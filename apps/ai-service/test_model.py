from ultralytics import YOLO
import sys

def test_inference():
    print("Loading model...")
    try:
        model = YOLO("models/pothole/best.pt")
    except Exception as e:
        print(f"Failed to load model: {e}")
        sys.exit(1)

    print("Running inference...")
    results = model(
        "test_potholes.jpeg",
        imgsz=640,
        conf=0.28,
        save=True # This enables saving visual output to runs/detect/
    )

    pothole_detected = False
    for result in results:
        if result.boxes is None or len(result.boxes) == 0:
            continue

        for box in result.boxes:
            pothole_detected = True
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            bbox = box.xyxy[0].tolist()

            print("Class ID:", class_id)
            print("Confidence:", confidence)
            print("Bounding Box:", bbox)
            print("-" * 40)
            
    if not pothole_detected:
        print("No potholes detected in this image.")
    elif len(results) > 0 and hasattr(results[0], 'save_dir'):
        print(f"Visual result saved to: {results[0].save_dir}")

if __name__ == "__main__":
    test_inference()
