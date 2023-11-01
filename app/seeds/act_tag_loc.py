from app.models import db, environment, act_tag_loc, SCHEMA
from sqlalchemy.sql import text


def seed_act_tag_loc():
    as1 = act_tag_loc.insert().values(activityId=1, locationId=1, tagId=1)
    as2 = act_tag_loc.insert().values(activityId=2, locationId=2, tagId=1)
    as3 = act_tag_loc.insert().values(activityId=3, locationId=3, tagId=1)
    as4 = act_tag_loc.insert().values(activityId=4, locationId=1, tagId=1)
    as5 = act_tag_loc.insert().values(activityId=5, locationId=2, tagId=1)
    as6 = act_tag_loc.insert().values(activityId=6, locationId=3, tagId=1)
    as7 = act_tag_loc.insert().values(activityId=7, locationId=1, tagId=1)
    as8 = act_tag_loc.insert().values(activityId=8, locationId=2, tagId=1)
    as9 = act_tag_loc.insert().values(activityId=9, locationId=3, tagId=1)
    as10 = act_tag_loc.insert().values(activityId=10, locationId=4, tagId=1)
    as11 = act_tag_loc.insert().values(activityId=11, locationId=5, tagId=1)
    as12 = act_tag_loc.insert().values(activityId=12, locationId=6, tagId=1)
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
def undo_act_tag_loc():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM act_tag_loc"))

    db.session.commit()
