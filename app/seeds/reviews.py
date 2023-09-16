from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    r1 = Review(userId=1, spotId=1, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r2 = Review(userId=2, spotId=1, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r3 = Review(userId=3, spotId=1, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r4 = Review(userId=1, spotId=2, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r5 = Review(userId=1, spotId=3, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r6 = Review(userId=1, spotId=4, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r7 = Review(userId=1, spotId=5, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r8 = Review(userId=1, spotId=6, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r9 = Review(userId=1, spotId=7, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r10 = Review(userId=1, spotId=8, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r11 = Review(userId=1, spotId=9, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    r12 = Review(userId=1, spotId=10, review='review lol', stars=3, createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))

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

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
