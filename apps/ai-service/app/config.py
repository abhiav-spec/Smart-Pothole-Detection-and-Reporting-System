from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_path: str = "models/pothole/best.pt"
    confidence_threshold: float = 0.28
    image_size: int = 640

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


settings = Settings()
