from app.models import db, Activity, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_activities():
    r1 = Activity(activityType='hiking', difficulty='moderate')
    r2 = Activity(activityType='hiking', difficulty='moderate')
    r3 = Activity(activityType='hiking', difficulty='moderate')
    r4 = Activity(activityType='hiking', difficulty='moderate')
    r5 = Activity(activityType='hiking', difficulty='moderate')
    r6 = Activity(activityType='hiking', difficulty='moderate')
    r7 = Activity(activityType='hiking', difficulty='moderate')
    r8 = Activity(activityType='hiking', difficulty='moderate')
    r9 = Activity(activityType='hiking', difficulty='moderate')
    r10 = Activity(activityType='hiking', difficulty='moderate')
    r11 = Activity(activityType='hiking', difficulty='moderate')
    r12 = Activity(activityType='hiking', difficulty='moderate')

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
