from fastapi import APIRouter, HTTPException
from sqlalchemy import select

from db.db import db_session
from db.schemas import BondBase
from db.models import BondModel

router = APIRouter()


@router.get('/bonds')
async def get_bonds():

    async with db_session() as db:

        fetch = await db.execute(select(BondModel))
        result = fetch.scalars().all()

        return result
    

@router.post('/bonds')
async def create_bond(bond: BondBase):
    
    async with db_session() as db:

        db.add(BondModel(**bond.model_dump()))

        await db.commit()

        return { 'detail': 'Облигация успешно добавлена!' }


@router.delete('/bonds/{id}')
async def delete_bond(id: int):

    async with db_session() as db:

        result = await db.execute(select(BondModel).where(BondModel.id == id))
        obj = result.scalar_one_or_none()

        if not obj:
            raise HTTPException(status_code=404, detail='Облигации не существует!')
        
        await db.delete(obj)
        await db.commit()

        return { 'detail': 'Облигация успешно удалена' }
    

@router.put('/bonds/{bond_id}')
async def edit_bond(bond: BondBase, bond_id: int):

    
    async with db_session() as db:

        result = await db.execute(select(BondModel).where(BondModel.id == bond_id))
        obj = result.scalar_one_or_none()

        if not obj:
            raise HTTPException(status_code=404, detail='Облигации не существует!')
        
        update_data = bond.dict(exclude_unset=True)
    
        # Обновляем поля модели
        for field, value in update_data.items():
            setattr(obj, field, value)

        await db.commit()

        return { 'detail': 'Данные облигации успешно изменены!' }
