from app.core.video_processor import process_video
import json

def test_video_processor():
    print("Testing Video Processor on testing.mp4 ...")
    
    # Process only the first few frames to keep output manageable during testing
    results = process_video("testing.mp4")[:5]
    
    print(f"\nProcessed {len(results)} total frames.")
    
    if len(results) > 0:
        print("\nResult for Frame 1:")
        print(json.dumps(results[0], indent=2))

if __name__ == "__main__":
    test_video_processor()
