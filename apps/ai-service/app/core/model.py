from ultralytics import YOLO

from app.config import settings


class YOLOModelManager:
    def __init__(self):
        self.model = None

    def load_model(self):
        if self.model is None:
            self.model = YOLO(settings.model_path)

        return self.model

    def get_model(self):
        if self.model is None:
            return self.load_model()

        return self.model


model_manager = YOLOModelManager()
