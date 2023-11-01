from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_tags():
    r1 = Tag(name='great!')
    r2 = Tag(name='amazing!')
    r3 = Tag(name='warm')
    r4 = Tag(name='family friendly')
    r5 = Tag(name='no dogs allowed')
    r6 = Tag(name='dogs allowed')
    r7 = Tag(name='amazing')
    r8 = Tag(name='beautiful')
    r9 = Tag(name='great!')
    r10 = Tag(name='haha')
    r11 = Tag(name='dry')
    r12 = Tag(name='wet')

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


def undo_tags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
