from app.models import db, environment, activitylocation, SCHEMA
from sqlalchemy.sql import text


def seed_activitylocation():
    as1 = activitylocation.insert().values(activityId=1, locationId=1)
    as2 = activitylocation.insert().values(activityId=1, locationId=2)
    as3 = activitylocation.insert().values(activityId=1, locationId=3)
    as4 = activitylocation.insert().values(activityId=1, locationId=4)
    as5 = activitylocation.insert().values(activityId=2, locationId=5)
    as6 = activitylocation.insert().values(activityId=2, locationId=6)
    as7 = activitylocation.insert().values(activityId=2, locationId=7)
    as8 = activitylocation.insert().values(activityId=2, locationId=8)
    as9 = activitylocation.insert().values(activityId=3, locationId=9)
    as10 = activitylocation.insert().values(activityId=3, locationId=10)
    as11 = activitylocation.insert().values(activityId=3, locationId=11)
    as12 = activitylocation.insert().values(activityId=3, locationId=12)
    db.session.execute(as1)
    db.session.execute(as2)
    db.session.execute(as3)
    db.session.execute(as4)
    db.session.execute(as5)
    db.session.execute(as6)
    db.session.execute(as7)
    db.session.execute(as8)
    db.session.execute(as9)
    db.session.execute(as10)
    db.session.execute(as11)
    db.session.execute(as12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_activitylocation():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activitylocation"))

    db.session.commit()
