from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime

class BondBase(BaseModel):
    name: str
    nominal: float
    coupon: float
    day: int
    quantity: int
    months: List[int]