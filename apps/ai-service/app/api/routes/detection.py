import io
import os
import tempfile
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image, UnidentifiedImageError

from app.core.inference import detect_image
from app.core.video_processor import process_video
from app.schemas.detection import DetectionResponse

router = APIRouter()

@router.post("/detect/image", response_model=DetectionResponse)
async def detect_image_endpoint(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    try:
        file_bytes = await image.read()
        pil_image = Image.open(io.BytesIO(file_bytes))
        result_dict = detect_image(pil_image)
        return result_dict
    except HTTPException:
        raise
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid or corrupted image file")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process file")

@router.post("/detect/video")
async def detect_video_endpoint(video: UploadFile = File(...)):
    temp_path = None
    try:
        # Get original extension, e.g., ".mp4"
        suffix = os.path.splitext(video.filename or "")[1]

        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            # Safely copy chunks to disk instead of memory
            shutil.copyfileobj(video.file, temp_file)
            temp_path = temp_file.name
        
        # Pass path to existing processor layer
        results = process_video(temp_path)
        return results

    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process file")

    finally:
        # Guarantee cleanup even on error
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
