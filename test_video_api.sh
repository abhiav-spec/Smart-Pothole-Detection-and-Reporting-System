cd apps/ai-service
source .venv/bin/activate
uvicorn app.main:app &
SERVER_PID=$!
sleep 5
echo "--- Testing /detect/video ---"
# We pipe to head/jq so we don't dump thousands of lines to terminal
curl -s -X POST -F "video=@testing.mp4" http://127.0.0.1:8000/detect/video | cut -c1-300
echo "..."
echo -e "\n\n--- Cleaning up ---"
kill $SERVER_PID
