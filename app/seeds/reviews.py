from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_reviews():
    # r1 = Review(userId=1, locationId=11, review='I love going here.', stars=4,
    #             createdAt=datetime(2023, 9, 1), updatedAt=datetime(2023, 9, 1))
    r2 = Review(userId=2, locationId=1, review='So many beautiful waterfalls.',
                stars=5, createdAt=datetime(2023, 9, 14), updatedAt=datetime(2023, 9, 14))
    r3 = Review(userId=3, locationId=1, review='A great hiking location.',
                stars=4, createdAt=datetime(2023, 8, 25), updatedAt=datetime(2023, 8, 25))
    r4 = Review(userId=2, locationId=2, review='A great short hike. Not difficult at all.',
                stars=4, createdAt=datetime(2023, 9, 19), updatedAt=datetime(2023, 9, 19))
    r5 = Review(userId=2, locationId=3, review='Fun and short hike.', stars=3,
                createdAt=datetime(2023, 5, 19), updatedAt=datetime(2023, 5, 19))
    r6 = Review(userId=3, locationId=4, review='I love coming here with my family <3',
                stars=5, createdAt=datetime(2023, 9, 19), updatedAt=datetime(2023, 9, 19))
    r7 = Review(userId=3, locationId=5, review='Steep.', stars=3,
                createdAt=datetime(2023, 4, 9), updatedAt=datetime(2023, 4, 9))
    r8 = Review(userId=1, locationId=6, review='Beautiful area.', stars=3,
                createdAt=datetime(2023, 2, 19), updatedAt=datetime(2023, 2, 19))
    r9 = Review(userId=1, locationId=7, review='Nice views.', stars=3,
                createdAt=datetime(2023, 7, 14), updatedAt=datetime(2023, 7, 14))
    r10 = Review(userId=1, locationId=8, review='Good walk.', stars=3,
                 createdAt=datetime(2023, 8, 19), updatedAt=datetime(2023, 8, 19))
    r11 = Review(userId=1, locationId=9, review='The water is so blue.', stars=3,
                 createdAt=datetime(2023, 10, 1), updatedAt=datetime(2023, 10, 1))
    r12 = Review(userId=1, locationId=10, review='Beautiful waterfall. Accessible to everyone.',
                 stars=3, createdAt=datetime(2023, 9, 9), updatedAt=datetime(2023, 9, 9))

    # db.session.add(r1)
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


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
