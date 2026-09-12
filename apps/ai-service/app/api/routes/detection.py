import io
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image

from app.core.inference import detect_image
from app.schemas.detection import DetectionResponse

router = APIRouter()

@router.post("/detect/image", response_model=DetectionResponse)
async def detect_image_endpoint(image: UploadFile = File(...)):
    # Validate it's an image
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    try:
        # Read file bytes
        file_bytes = await image.read()
        
        # Convert bytes to PIL Image (which YOLO naturally accepts)
        pil_image = Image.open(io.BytesIO(file_bytes))
        
        # Call the existing Step 7 logic (DO NOT put YOLO logic here)
        result_dict = detect_image(pil_image)
        
        # Return the structured dictionary, which FastAPI will automatically
        # validate and serialize into the DetectionResponse Pydantic schema
        return result_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
