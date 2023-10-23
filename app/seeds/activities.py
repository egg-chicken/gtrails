from app.models import db, Activity, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_activities():
    r1 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r2 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r3 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r4 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r5 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r6 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r7 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r8 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r9 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r10 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r11 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    r12 = Activity(userId='2', activityType='hiking', trailConditions='slippery', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)
    db.session.add(r11)
    db.session.add(r12)
    db.session.commit()


def undo_activities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activities"))

    db.session.commit()
