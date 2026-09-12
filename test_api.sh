cd apps/ai-service
source .venv/bin/activate
uvicorn app.main:app &
SERVER_PID=$!
sleep 3
echo "--- Testing /health ---"
curl -s http://127.0.0.1:8000/health
echo -e "\n\n--- Testing /detect/image ---"
curl -s -X POST -F "image=@test_potholes.jpeg" http://127.0.0.1:8000/detect/image
echo -e "\n\n--- Cleaning up ---"
kill $SERVER_PID
