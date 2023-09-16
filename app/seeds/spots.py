from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_spots():
    s1 = Spot(name='Silver Falls State Park', userId=1, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 1 lol', length=8, elevGain=100, routeType='Loop', image='url1', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s2 = Spot(name='Wahclella Falls Trail', userId=1, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 2 lol', length=8, elevGain=100, routeType='Loop', image='url 2', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s3 = Spot(name='Drift Creek Suspension Bridge and Waterfall', userId=1, address='add 1', city='city', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text lol', length=8, elevGain=100, routeType='Loop', image='url 3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s4 = Spot(name='Smith Rock State Park', userId=1, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 3 lol', length=8, elevGain=100, routeType='Loop', image='url 4', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s5 = Spot(name='Spencer Butte Trail', userId=1, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 4 lol', length=8, elevGain=100, routeType='Loop', image='url 5', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s6 = Spot(name='Heceta Head Lighthouse', userId=2, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 5 lol', length=8, elevGain=100, routeType='Loop', image='url 6', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s7 = Spot(name='Painted Hills', userId=2, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 6 lol', length=8, elevGain=100, routeType='Loop', image='url 7', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s8 = Spot(name='Umpqua Falls', userId=2, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 7 lol', length=8, elevGain=100, routeType='Loop', image='url 8', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s9 = Spot(name='Rattlesnake Lake', userId=2, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 8 ol', length=8, elevGain=100, routeType='Loop', image='url 9', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s10 = Spot(name='Queen Elizabeth Park', userId=3, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 9 lol', length=8, elevGain=100, routeType='Loop', image='url 10', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s11 = Spot(name='Lake Louise', userId=3, address='add 1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 10 lol', length=8, elevGain=100, routeType='Loop', image='url 11', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))
    s12 = Spot(name='Multnomah Falls', userId=3, address='city1', city='city1', state='Oregon', country='country1', lat=44.876667, lng=122.64805, description='text 11 lol', length=8, elevGain=100, routeType='Loop', image='url 12', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19))

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.add(s6)
    db.session.add(s7)
    db.session.add(s8)
    db.session.add(s9)
    db.session.add(s10)
    db.session.add(s11)
    db.session.add(s12)
    db.session.commit()

def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))

    db.session.commit()
