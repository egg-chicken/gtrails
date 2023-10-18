"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('firstName', sa.String(
                        length=40), nullable=False),
                    sa.Column('lastName', sa.String(
                        length=40), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('locations',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('userId', sa.Integer(), nullable=False),
        sa.Column('address', sa.String(length=255), nullable=False),
        sa.Column('city', sa.String(length=255), nullable=False),
        sa.Column('state', sa.String(length=255), nullable=False),
        sa.Column('country', sa.String(length=255), nullable=False),
        sa.Column('lat', sa.Float(), nullable=False),
        sa.Column('lng', sa.Float(), nullable=False),
        sa.Column('description', sa.String(length=255), nullable=False),
        sa.Column('difficulty', sa.String(length=255), nullable=False),
        sa.Column('length', sa.Float(), nullable=False),
        sa.Column('elevGain', sa.Integer(), nullable=False),
        sa.Column('routeType', sa.String(length=255), nullable=False),
        sa.Column('image', sa.String(length=255), nullable=False),
        sa.Column('createdAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
        sa.Column('updatedAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(["userId"], ['users.id']),
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=False),
                    sa.Column('locationId', sa.Integer(), nullable=False),
                    sa.Column('review', sa.String(length=255), nullable=False),
                    sa.Column('stars', sa.Integer(), nullable=False),
                    sa.Column('createdAt', sa.DateTime(),
                              server_default=sa.func.current_timestamp(), nullable=False),
                    sa.Column('updatedAt', sa.DateTime(),
                              server_default=sa.func.current_timestamp(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(["userId"], ['users.id']),
                    sa.ForeignKeyConstraint(["locationId"], ['locations.id'])
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE locations SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users', 'locations', 'reviews')
    # ### end Alembic commands ###
