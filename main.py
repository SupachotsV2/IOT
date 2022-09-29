from pydoc import HTMLRepr
from re import template
from urllib import request
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name= "static")
templates = Jinja2Templates(directory="templates")
origins = [
    "http://localhost:8080",
    "http://localhost:5500",
    "https://stackpython.co",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model
class Valve(BaseModel):
    status: str

valve_StatusInfo = [
    {
        "title" : "valve_1",
        "status": "Off"
    },
    {
        "title" : "valve_2",
        "status": "Off"
    },
    {
        "title" : "valve_3",
        "status": "Off"
    },
    {
        "title" : "valve_4",
        "status": "Off"
    }
]

Water_Pump = [
    {
        "status": "Off"
    }
]



@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("main.html", {"request": request})

@app.get("/StatusInfo/")
async def get_ValveStatus():
    return valve_StatusInfo

@app.get("/StatusInfo/{valve_id}")
async def get_ValveStatus(valve_id: int):
    return valve_StatusInfo[valve_id-1]

@app.put("/StatusInfo/{valve_id}")
async def edit_ValveStatus(valve_id: int, status: Valve):
    result = status.dict()
    valve_StatusInfo[valve_id-1].update(result)
    return result

@app.get("/WaterPump/")
async def get_ValveStatusWaterPump():
    return Water_Pump

@app.get("/WaterPump/{Pump_id}")
async def get_ValveStatusWaterPump(Pump_id: int):
    return Water_Pump[Pump_id-1]

@app.put("/WaterPump/{Pump_id}")
async def edit_ValveStatusWaterPump(Pump_id: int, status: Valve):
    result = status.dict()
    Water_Pump[Pump_id-1].update(result)
    return result
