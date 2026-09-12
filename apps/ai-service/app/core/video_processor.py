import cv2
from PIL import Image
from app.core.inference import detect_image


def process_video(video_path: str):
    """
    Reads a video frame by frame, converts each frame to a PIL Image, 
    and passes it to the existing detect_image() inference layer.
    """
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        raise ValueError("Invalid or corrupted video file")
    
    # Store results for all frames
    video_results = []
    
    frame_count = 0
    while True:
        success, frame = cap.read()
        if not success:
            break
            
        frame_count += 1
        
        # OpenCV reads in BGR. Convert to RGB for PIL/YOLO.
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb_frame)
        
        # Call the existing Step 7 inference logic directly
        # This will return the dictionary matching our DetectionResponse schema
        detection_result = detect_image(pil_image)
        
        # Append the frame result with a frame identifier
        video_results.append({
            "frame": frame_count,
            "result": detection_result
        })
        
    cap.release()
    
    return video_results
