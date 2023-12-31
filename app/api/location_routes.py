from flask import Blueprint, jsonify, request
from app.models import User, Location, Review, Activity, act_tag_loc, db
from app.forms.location_form import LocationForm
from app.forms.review_form import ReviewForm
from app.forms.activity_form import ActivityForm
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required, login_user

location_routes = Blueprint('locations', __name__)


# Returns all the locations
@location_routes.route('/', methods=['GET'])
def getLocations():

    locations = Location.query.all()

    return {'locations': [location.to_dict() for location in locations]}


# return all the locations created by the current user
@location_routes.route('/created', methods=['GET'])
@login_required
def userLocations():

    currentUserLocations = Location.query.filter_by(
        userId=current_user.id).all()

    locationInfo = []

    for location in currentUserLocations:
        location_info = location.to_dict()
        locationInfo.append(location_info)

    return {'locations': locationInfo}


# return details of a location by Id
@location_routes.route('/<int:id>', methods=['GET'])
def locationId(id):

    location = Location.query.get(id)

    if location is None:
        return {'message': "Location couldn\'t be found", "statusCode": 404}

    location_info = location.to_dict()

    return location_info


# creates and returns a new location
@location_routes.route('/new', methods=['POST'])
@login_required
def createLocation():

    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        location = Location(
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            description=form.data['description'],
            difficulty=form.data['difficulty'],
            length=form.data['length'],
            elevGain=form.data['elevGain'],
            routeType=form.data['routeType'],
            image=form.data['image'],
            userId=current_user.id,
        )
        db.session.add(location)
        db.session.commit()
        return location.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# updates a location
@location_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def updateLocation(id):

    location = Location.query.get(id)

    if location is None:
        return {'message': "Location couldn\'t be found", "statusCode": 404}

    if location.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        location.name = form.data['name']
        location.address = form.data['address']
        location.city = form.data['city']
        location.state = form.data['state']
        location.country = form.data['country']
        location.lat = form.data['lat']
        location.lng = form.data['lng']
        location.description = form.data['description']
        location.difficulty = form.data['difficulty']
        location.length = form.data['length']
        location.elevGain = form.data['elevGain']
        location.routeType = form.data['routeType']
        location.image = form.data['image']

        db.session.commit()
        return location.to_dict()

    # return location.to_dict()
    return {"message": "Validation Error", "statusCode": 400, 'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a location
@location_routes.route('/<int:id>/del', methods=['DELETE'])
@login_required
def delete(id):
    location = Location.query.get(id)

    # user = location.user

    if location is None:
        return {'message': "Location couldn\'t be found", "statusCode": 404}

    if location.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    if location:
        for review in location.reviews:
            db.session.delete(review)

    # user.locations.remove(location)
    db.session.delete(location)
    db.session.commit()

    return {"message": 'Successfully deleted', "statusCode": 200}


# create a review for a location based on the location's id
@location_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def createReview(id):

    location = Location.query.get(id)

    if location is None:
        return jsonify({'message': "Location couldn't be found"}), 404

    current_user_id = current_user.id

    # existing_review = Review.query.filter_by(userId=current_user_id, locationId=id).first()
    existing_review = Review.query.filter(
        Review.userId == current_user_id, Review.locationId == id).first()

    if existing_review:
        return jsonify({'message': 'User already has a review for this location'}), 500

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        locationId = location.id

        review = Review(
            stars=form.data['stars'],
            review=form.data['review'],
            userId=current_user.id,
            locationId=locationId
        )

        if not isinstance(review.stars, int) or review.stars < 1 or review.stars > 5:
            return jsonify({'message': 'Stars must be an integer from 1 to 5', 'errors': {'stars': 'Stars must be an integer from 1 to 5'}}), 400

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    return {"message": "Validation Error", "statusCode": 400, 'errors': validation_errors_to_error_messages(form.errors)}, 400


# get all the reviews by a location's id
@location_routes.route('/<int:id>/reviews', methods=['GET'])
def locationReviews(id):

    reviews = Review.query.filter_by(locationId=id).all()

    if reviews is None:
        return {"message": "No reviews found for the location"}, 404

    reviews_data = []

    location = Location.query.get(id)
    avg_rating = location.calculate_average_rating()

    for review in reviews:
        userInfo = review.user

        reviews_data.append({
            "createdAt": review.createdAt,
            "id": review.id,
            "review": review.review,
            "locationId": review.locationId,
            "avgRating": avg_rating,
            "stars": review.stars,
            "updatedAt": review.updatedAt,
            "userId": review.userId,
            "User": {
                'id': userInfo.id,
                'firstName': userInfo.firstName,
                'lastName': userInfo.lastName
            }
        })
    return jsonify({"Reviews": reviews_data}), 200


# get all the activities by locations
@location_routes.route('/<int:id>/activities', methods=['GET'])
def locationActivities(id):

    location = Location.query.get(id)

    if location is None:
        return jsonify({'message': "Location couldn't be found"}), 404

    activities = Activity.query.join(act_tag_loc).filter(
        act_tag_loc.c.locationId == id).all()

    act_data = []

    for activity in activities:
        user_info = activity.user

        act_data.append({
            "id": activity.id,
            "activityType": activity.activityType,
            "trailConditions": activity.trailConditions,
            "updatedAt": activity.updatedAt,
            "createdAt": activity.createdAt,
            "userId": activity.userId,
            "User": {
                'id': user_info.id,
                'firstName': user_info.firstName,
                'lastName': user_info.lastName
            }
        })

    return jsonify({'activities': act_data}), 200


# create an activity based on location's id
@location_routes.route('/<int:id>/activities/new', methods=['POST'])
@login_required
def createActivity(id):

    location = Location.query.get(id)

    if location is None:
        return jsonify({'message': "Location couldn't be found"}), 404

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        activity = Activity(
            userId=current_user.id,
            activityType=form.data['activityType'],
            trailConditions=form.data['trailConditions']
        )

        db.session.add(activity)
        db.session.commit()

        association = act_tag_loc.insert().values(
            activityId=activity.id,
            locationId=location.id,
        )

        db.session.execute(association)
        db.session.commit()
        return activity.to_dict()

    return {"message": "Validation Error", "statusCode": 400, 'errors': validation_errors_to_error_messages(form.errors)}, 400
