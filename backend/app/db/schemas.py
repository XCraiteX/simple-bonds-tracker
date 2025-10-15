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


class BondUpdate(BaseModel):
    name: Optional[str] = None
    nominal: Optional[float] = None
    coupon: Optional[float] = None
    day: Optional[int] = None
    quantity: Optional[int] = None
    months: Optional[List[int]] = None