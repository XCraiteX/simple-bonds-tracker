from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
import aiosqlite, sqlite3

from db.models import Base

engine = create_async_engine('sqlite+aiosqlite:///data/database.db', echo=True)
db_session = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def create_all():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)