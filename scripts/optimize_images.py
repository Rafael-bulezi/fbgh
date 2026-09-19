from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"
MAX_EDGE = 1920
QUALITY = 82

for source in sorted(IMAGE_DIR.iterdir()):
    if source.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    try:
        with Image.open(source) as original:
            image = original.convert("RGB")
            if max(image.size) > MAX_EDGE:
                image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
            target = source if source.suffix.lower() == ".webp" else source.with_suffix(".webp")
            before = source.stat().st_size
            image.save(target, "WEBP", quality=QUALITY, method=6)
            after = target.stat().st_size
            print(f"{source.name}: {before // 1024} KB -> {target.name}: {after // 1024} KB ({image.width}x{image.height})")
    except Exception as error:
        print(f"SKIP {source.name}: {error}")
