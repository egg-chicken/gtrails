from flask import Blueprint, jsonify, request
from app.models import User, Activity, db
from app.forms.activity_form import ActivityForm
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required, login_user

activity_routes = Blueprint('activities', __name__)

# return all the different activities (Browse by activity)
@activity_routes.route('/', methods=['GET'])
def getActivity():

    activities = Activity.query.all()


    return {'activities': [activity.to_dict() for activity in activities]}


# return all the activities created by user


# return the details of the activity based on id
@activity_routes.route('/<int:id>', methods=['GET'])
def getActivityId(id):

    activity = Activity.query.get(id)

    if activity is None:
        return {'message': "Activity couldn\'t be found", "statusCode": 404}

    return activity.to_dict()


# create an activity
@activity_routes.route('/new', methods=['POST'])
@login_required
def createActivity():

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        activity = Activity(
            activityType=form.data['activityType'],
            trailConditions=form.data['trailConditions'],
            # userId=current_user.id,
        )
        db.session.add(activity)
        db.session.commit()
        return activity.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# edit an activity
@activity_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def updatedActivity(id):

    activity = Activity.query.get(id)

    if activity is None:
        return {'message': "Activity couldn\'t be found", "statusCode": 404}

    if activity.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        activity = Activity(
            activityType=form.data['activityType'],
            trailConditions=form.data['trailConditions'],
            userId=current_user.id,
        )
        db.session.add(activity)
        db.session.commit()
        return activity.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# delete an activity
@activity_routes.route('/<int:id>/del', methods=['DELETE'])
@login_required
def delete(id):
    activity = Activity.query.get(id)

    if activity is None:
        return {'message': "Activity couldn\'t be found", "statusCode": 404}

    if activity.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    db.session.delete(activity)
    db.session.commit()

    return {"message": 'Successfully deleted', "statusCode": 200}