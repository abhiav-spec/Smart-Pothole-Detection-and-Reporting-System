import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_detect_video_success():
    # Use the existing testing.mp4
    with open("testing.mp4", "rb") as f:
        response = client.post("/detect/video", files={"video": ("testing.mp4", f, "video/mp4")})
    
    assert response.status_code == 200
    data = response.json()
    
    # Check that it's a list (frames)
    assert isinstance(data, list)
    
    if len(data) > 0:
        first_frame = data[0]
        assert "result" in first_frame
        result = first_frame["result"]
        assert "detected" in result
        assert "count" in result
        assert "detections" in result

def test_detect_video_invalid():
    # Send a dummy text file masquerading as a video
    dummy_file = io.BytesIO(b"not a real video")
    response = client.post("/detect/video", files={"video": ("dummy.mp4", dummy_file, "video/mp4")})
    
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid or corrupted video file"}
