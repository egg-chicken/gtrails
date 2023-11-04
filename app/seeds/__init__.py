from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_locations
from .reviews import seed_reviews, undo_reviews
from .activities import seed_activities, undo_activities
from .act_tag_loc import seed_act_tag_loc, undo_act_tag_loc
from .list_location import seed_list_location, undo_list_location
from .lists import seed_lists, undo_lists
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_locations()
        undo_reviews()
        undo_activities()
        undo_act_tag_loc()
        undo_lists()
        undo_list_location()
    seed_users()
    seed_locations()
    seed_reviews()
    seed_activities()
    seed_act_tag_loc()
    seed_lists()
    seed_list_location()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_locations()
    undo_reviews()
    undo_activities()
    undo_act_tag_loc()
    undo_lists()
    undo_list_location()
