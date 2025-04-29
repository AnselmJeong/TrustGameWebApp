from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scripts.play_trust import play_round, select_random_profile
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:9002"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PlayRequest(BaseModel):
    amount_sent: int


@app.post("/api/play")
async def play_game(req: PlayRequest):
    print("Received amount_sent:", req.amount_sent)  # 로그로 확인
    # 예시: 무작위 프로필 선택
    player_b_profile = select_random_profile()
    result = play_round(
        player_b_profile=player_b_profile,
        session_id=1,
        round_num=1,
        human_balance=20,
        total_rounds=7,
        amount_sent=req.amount_sent,
    )
    return result


@app.get("/api/status")
async def get_status():
    return {"status": "ok"}
