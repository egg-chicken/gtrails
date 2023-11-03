from app.models import db, list_location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_list_location():
    l1 = list_location.insert().values(listId=1, locationId=1)
    l2 = list_location.insert().values(listId=2, locationId=2)
    l3 = list_location.insert().values(listId=3, locationId=3)
    l4 = list_location.insert().values(listId=4, locationId=4)
    l5 = list_location.insert().values(listId=5, locationId=5)
    l6 = list_location.insert().values(listId=6, locationId=6)


    db.session.execute(l1)
    db.session.execute(l2)
    db.session.execute(l3)
    db.session.execute(l4)
    db.session.execute(l5)
    db.session.execute(l6)
    db.session.commit()


def undo_list_location():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_location"))

    db.session.commit()
