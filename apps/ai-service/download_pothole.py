import requests

url = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Pothole_on_an_Indian_road.jpg"
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
r = requests.get(url, headers=headers)

if r.status_code == 200:
    with open("apps/ai-service/test.jpg", "wb") as f:
        f.write(r.content)
    print("Downloaded successfully!")
else:
    print(f"Failed with status code: {r.status_code}")
