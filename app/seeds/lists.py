from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_lists():
    r1 = List(userId=1, listName='Oregon waterfalls', createdAt=datetime(2023, 9, 14), updatedAt=datetime(2023, 9, 14))
    r2 = List(userId=1, listName='Roadtrip 2024', createdAt=datetime(2023, 8, 25), updatedAt=datetime(2023, 8, 25))
    r3 = List(userId=2, listName='Hiking', createdAt=datetime(2023, 9, 19), updatedAt=datetime(2023, 9, 19))
    r4 = List(userId=2, listName='Must go', createdAt=datetime(2023, 5, 19), updatedAt=datetime(2023, 5, 19))
    r5 = List(userId=3, listName='I love coming here', createdAt=datetime(2023, 9, 19), updatedAt=datetime(2023, 9, 19))
    r6 = List(userId=3, listName='Need to go', createdAt=datetime(2023, 9, 19), updatedAt=datetime(2023, 9, 19))


    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
