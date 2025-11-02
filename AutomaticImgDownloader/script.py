import json as js
import os
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

JSON_FILE = "data.json"
SAVE_DIR = "images"
os.makedirs(SAVE_DIR, exist_ok=True)

with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = js.load(f)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

def search_image_bing(query):
    query = query.replace("_", " ")
    url = f"https://www.bing.com/images/search?q={query}&form=QBIR"
    res = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(res.text, "html.parser")
    m = soup.find("a", class_="iusc")
    if m and m.has_attr("m"):
        try:
            metadata = js.loads(m["m"])
            return metadata.get("murl")
        except:
            return None
    return None

def download_and_save(url, path):
    try:
        res = requests.get(url, stream=True)
        res.raise_for_status()
        img = Image.open(BytesIO(res.content))
        img.save(path)
        print(f"Збережено {path}")
        return True
    except Exception as e:
        print(f"Помилка при завантаженні {url}: {e}")
        return False

for item in data:
    image_field = item.get("image")
    if not image_field:
        continue
    filename = os.path.basename(image_field)
    name_without_ext = os.path.splitext(filename)[0]

    print(f"Шукаємо зображення для: {name_without_ext}")
    img_url = search_image_bing(name_without_ext)
    if img_url:
        download_and_save(img_url, os.path.join(SAVE_DIR, filename))
    else:
        print(f"Не знайдено зображення для {name_without_ext}")
