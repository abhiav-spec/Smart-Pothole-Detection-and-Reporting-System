from app.core.inference import detect_image
import json

def test_inference():
    print("Testing inference via detect_image()...")
    
    # We use test_potholes.jpeg because it exists in the folder
    # and has successfully detected potholes in previous steps.
    result = detect_image("test_potholes.jpeg")
    
    print("\nResult Structure:")
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    test_inference()
