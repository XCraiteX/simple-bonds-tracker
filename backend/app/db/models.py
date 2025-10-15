from typing import List
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import JSON, Float, String, Integer, Boolean, DateTime


class Base(DeclarativeBase):
    pass 


class BondModel(Base):
    __tablename__ = 'bonds'

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[String] = mapped_column(String)
    nominal: Mapped[Integer] = mapped_column(Integer)
    coupon: Mapped[Float] = mapped_column(Float)
    months: Mapped[List[int]] = mapped_column(JSON)
    day: Mapped[Integer] = mapped_column(Integer)
    quantity: Mapped[Integer] = mapped_column(Integer)
