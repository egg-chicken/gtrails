from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_locations():

    s1 = Location(name='Trail of Ten Falls', userId=1, address='Silver Falls State Park, Silverton, OR 97381', city='Silverton', state='Oregon', country='USA', lat=44.876667, lng=-122.64805, description='This is a moderate hike which loops you around 10 waterfalls',
                  length=7.2, difficulty='Moderate', elevGain=800, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695495516/gtrails/silverfalls-waterfall.jpg', createdAt=datetime(2023, 4, 21), updatedAt=datetime(2023, 4, 21))
    s2 = Location(name='Smith Rock State Park', userId=1, address='Smith Rock State Park, Deschutes, OR 97760', city='Deschutes County', state='Oregon', country='USA', lat=44.3682, lng=-121.1406, description='A Beautiful big rock', length=1.0, difficulty='Moderate',
                  elevGain=100, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695495582/gtrails/smithrock-main.jpg', createdAt=datetime(2022, 7, 5), updatedAt=datetime(2022, 7, 5))
    s3 = Location(name='Wahclella Falls Trail', userId=1, address='Wahclella Falls Trail, Cascade Locks, OR 97014', city='Cascade Locks', state='Oregon', country='USA', lat=45.6307, lng=-121.95401, description='Easy hike which loops around a waterfall',
                  length=1.2, difficulty='Moderate', elevGain=100, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695498081/gtrails/wahclella-falls-main.jpg', createdAt=datetime(2022, 2, 12), updatedAt=datetime(2022, 2, 12))
    s4 = Location(name='Knox Mountain Park', userId=2, address='450 Knox Mountain Dr, Kelowna, BC V1Y 9X3, Canada', city='Kelowna', state='British Columbia', country='Canada', lat=49.9141, lng=-119.4827, description='A beautiful trail with a great view of the city',
                  length=2.6, difficulty='Moderate', elevGain=875, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695710508/gtrails/knox-mountain-park-trail.jpg', createdAt=datetime(2022, 5, 18), updatedAt=datetime(2022, 5, 18))
    s5 = Location(name='Spencer Butte Trail', userId=2, address='Spencer Butte Trailhead, Parking lot, Eugene, OR 97405', city='Eugene', state='Oregon', country='USA', lat=43.5859, lng=-123.0545, description='A popular trail with the locals.',
                  length=1.7, difficulty='Moderate', elevGain=784, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695709896/gtrails/spencer-butte-main.jpg', createdAt=datetime(2017, 12, 2), updatedAt=datetime(2017, 12, 2))
    s6 = Location(name='Drift Creek Suspension Bridge', userId=2, address='BLM Rd 1770, Otis, OR 97368', city='Otis', state='Oregon', country='USA', lat=44.9361268, lng=-123.8546705, description='Easy hike which loops around a waterfall',
                  length=3.1, difficulty='Moderate', elevGain=100, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695498300/gtrails/drift-creek-suspension-bridge-falls.jpg', createdAt=datetime(2022, 3, 5), updatedAt=datetime(2022, 3, 5))
    s7 = Location(name='Heceta Head Lighthouse', userId=2, address='725 Summer St, Florence, OR 97439', city='Florence', state='Oregon', country='USA', lat=44.1374, lng=-124.1281, description='Take a walk to the lighthouse where you can enjoy the view of the coast.',
                  length=0.9, difficulty='Moderate', elevGain=100, routeType='Out & Back', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695711232/gtrails/heceta-head-bridge-2.jpg', createdAt=datetime(2018, 6, 1), updatedAt=datetime(2018, 6, 1))
    s8 = Location(name='Calipano Suspension Bridge', userId=2, address='3735 Capilano Rd, North Vancouver, BC V7R 4J1, Canada', city='North Vancouver', state='British Columbia', country='Canada', lat=49.3429, lng=-123.1149, description='This bridge crosses the calipano river',
                  length=1.1, difficulty='Moderate', elevGain=265, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695495730/gtrails/calipano-suspension-bridge-main.jpg', createdAt=datetime(2021, 11, 19), updatedAt=datetime(2021, 11, 19))
    s9 = Location(name='Rattlesnake Lake', userId=3, address='Rattlesnake Lake, Washington 98045', city='North Bend', state='Washington', country='USA', lat=47.4308, lng=-121.7751, description='A nice place to visit go on a stroll', length=8,
                  elevGain=100, difficulty='Moderate', routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695714129/gtrails/rattlesnake-lake.jpg', createdAt=datetime(2021, 11, 19), updatedAt=datetime(2021, 11, 19))
    s10 = Location(name='Queen Elizabeth Park', userId=3, address='Multnomah Falls, Oregon 97014', city='Vancouver', state='British Columbia', country='Canada', lat=49.2418, lng=-123.1126, description='A nice place to visit go on a stroll',
                   length=8, difficulty='Moderate', elevGain=100, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695499405/gtrails/queen-elizabeth-park.jpg', createdAt=datetime(2021, 11, 19), updatedAt=datetime(2021, 11, 19))
    s11 = Location(name='Lake Louise', userId=3, address='Banff National Park, Alberta, Canada', city='Banff', state='Alberta', country='Canada', lat=51.4254, lng=-116.1773, description='A nice place to visit go on a stroll',
                   length=8, difficulty='Moderate', elevGain=100, routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695499078/gtrails/lake-louise-trail.jpg', createdAt=datetime(2021, 11, 19), updatedAt=datetime(2021, 11, 19))
    s12 = Location(name='Multnomah Falls', userId=3, address='Multnomah Falls, Oregon 97014', city='Portland', state='Oregon', country='USA', lat=45.5762, lng=-122.1158, description='A nice place to visit go on a stroll', length=8,
                   elevGain=100, difficulty='Moderate', routeType='Loop', image='https://res.cloudinary.com/dc5lrkblw/image/upload/v1695714812/gtrails/multnomah-falls.jpg', createdAt=datetime(2021, 11, 19), updatedAt=datetime(2021, 11, 19))

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


def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()
