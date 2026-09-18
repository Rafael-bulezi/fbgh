from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"
NAMES = [
    "rental-story-01-choose",
    "rental-story-02-take",
    "rental-story-03-go",
    "rental-story-04-yours",
    "experience-hero-rental",
    "about-hero-human-arrival",
    "home-closing-arrive-with-intention",
    "experience-closing-ready-to-move",
]

for name in NAMES:
    source = IMAGE_DIR / f"{name}.jpg"
    target = IMAGE_DIR / f"{name}.webp"
    with Image.open(source) as image:
        image = image.convert("RGB")
        if image.width > 1920:
            height = round(image.height * 1920 / image.width)
            image = image.resize((1920, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=82, method=6)
        print(f"{source.name}: {source.stat().st_size // 1024} KB -> {target.name}: {target.stat().st_size // 1024} KB ({image.width}x{image.height})")
