import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_detect_image_success():
    # Use the existing test_potholes.jpeg
    with open("test_potholes.jpeg", "rb") as f:
        response = client.post("/detect/image", files={"image": ("test_potholes.jpeg", f, "image/jpeg")})
    
    assert response.status_code == 200
    data = response.json()
    assert "detected" in data
    assert "count" in data
    assert "detections" in data

def test_detect_image_invalid():
    # Send a dummy text file
    dummy_file = io.BytesIO(b"not a real image")
    response = client.post("/detect/image", files={"image": ("dummy.txt", dummy_file, "image/jpeg")})
    
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid or corrupted image file"}
