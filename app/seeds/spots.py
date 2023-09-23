from app.models import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_spots():
    s1 = Spot(name='Trail of Ten Falls - Silver Falls State Park', userId=1, address='Silverton, OR 97381', city='Silverton', state='Oregon', country='USA', lat=44.876667, lng=-122.64805, description='This is a moderate hike which loops you around 10 waterfalls', length=7.2, elevGain=800, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695495648/gtrails/silverfalls-main-waterfall.jpg', createdAt= datetime(2023,4,21), updatedAt= datetime(2023,4,21))
    s2 = Spot(name='Wahclella Falls Trail', userId=1, address='Wahclella Falls Trail, Cascade Locks, OR 97014', city='Cascade Locks', state='Oregon', country='USA', lat=45.29419, lng=-123.1364503, description='Easy hike which loops around a waterfall', length=1.2, elevGain=100, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695498081/gtrails/wahclella-falls-main.jpg', createdAt= datetime(2022,2,12), updatedAt= datetime(2022,2,12))
    s3 = Spot(name='Drift Creek Suspension Bridge and Waterfall', userId=1, address='BLM Rd 1770, Otis, OR 97368', city='Otis', state='Oregon', country='USA', lat=44.9361268, lng=-123.8546705, description='Easy hike which loops around a waterfall', length=3.1, elevGain=100, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695498300/gtrails/drift-creek-suspension-bridge-falls.jpg', createdAt= datetime(2022,3,5), updatedAt= datetime(2022,3,5))
    s4 = Spot(name='Smith Rock State Park', userId=1, address='Oregon 97760', city='Deschutes County', state='Oregon', country='USA', lat=44.6073285, lng=-123.4194954, description='A Beautiful big rock', length=1.0, elevGain=100, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695495582/gtrails/smithrock-main.jpg', createdAt= datetime(2022,7,5), updatedAt= datetime(2022,7,5))
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
