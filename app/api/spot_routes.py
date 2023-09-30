from flask import Blueprint, jsonify, request
from app.models import User, Spot, Review, db
from app.forms.spot_form import SpotForm
from app.forms.review_form import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required, login_user

spot_routes = Blueprint('spots', __name__)


# Returns all the spots
@spot_routes.route('/', methods=['GET'])
def getSpots():

    spots = Spot.query.all()

    return {'spots': [spot.to_dict() for spot in spots]}


# return all the spots created by the current user
@spot_routes.route('/created', methods=['GET'])
@login_required
def userSpots():

    currentUserSpots = Spot.query.filter_by(userId = current_user.id).all()


    spotInfo = []

    # for spot in currentUserSpots:

    #     spotInfo.append({
    #         'id': spot.id,
    #         'name': spot.name,
    #         'description': spot.description,
    #         'length': spot.length,
    #         'elevGain': spot.elevGain,
    #         'routeType': spot.routeType,
    #         'image': spot.image,
    #         # 'stars': review_info.stars
    #     })
    for spot in currentUserSpots:
        spot_info = spot.to_dict()
        spotInfo.append(spot_info)

    return {'spots': spotInfo}


# return details of a spot by Id
@spot_routes.route('/<int:id>', methods=['GET'])
def spotId(id):

    # spot = Spot.query.get(id)
    spot = Spot.query.get(id)

    if spot is None:
        return {'message': "Spot couldn\'t be found", "statusCode": 404}

    spot_info = spot.to_dict()

    return spot_info
    # reviews = Review.query.filter_by(spotId=id).all()

    # if spot is None:
    #     return {'message': "Spot couldn\'t be found", "statusCode": 404}

    # if reviews is None:
    #     return {'message': 'No reviews found for this spot', 'statusCode': 404}

    # reviewsList = [review.to_dict() for review in reviews]

    # spot_info = spot.to_dict()
    # spot_info['reviews'] = reviewsList

    # return jsonify(spot_info)


# creates and returns a new spot
@spot_routes.route('/new', methods=['POST'])
@login_required
def createSpot():

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spot = Spot(
            name = form.data['name'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            country = form.data['country'],
            lat = form.data['lat'],
            lng = form.data['lng'],
            description = form.data['description'],
            length = form.data['length'],
            elevGain = form.data['elevGain'],
            routeType = form.data['routeType'],
            image = form.data['image'],
            userId=current_user.id,
        )
        db.session.add(spot)
        db.session.commit()
        return spot.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# updates a spot
@spot_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def updateSpot(id):

    spot = Spot.query.get(id)

    if spot is None:
         return {'message': "Spot couldn\'t be found", "statusCode": 404}

    if spot.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spot.name = form.data['name']
        spot.address = form.data['address']
        spot.city = form.data['city']
        spot.state = form.data['state']
        spot.country = form.data['country']
        spot.lat = form.data['lat']
        spot.lng = form.data['lng']
        spot.description = form.data['description']
        spot.length = form.data['length']
        spot.elevGain = form.data['elevGain']
        spot.routeType = form.data['routeType']
        spot.image = form.data['image']

        db.session.commit()
        return spot.to_dict()

    # return spot.to_dict()
    return {"message": "Validation Error","statusCode": 400,'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a spot
@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteSpot(id):
    spot = Spot.query.get(id)

    if spot is None:
        return {'message': "Spot couldn\'t be found", "statusCode": 404}

    if spot.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    db.session.delete(spot)
    db.session.commit()

    return { "message": 'Successfully deleted', "statusCode": 200}


# create a review for a spot based on the spot's id
@spot_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def createReview(id):

    spot = Spot.query.get(id)

    if spot is None:
        return jsonify({'message': "Spot couldn't be found"}), 404

    current_user_id = current_user.id

    existing_review = Review.query.filter_by(userId=current_user_id, spotId=id).first()

    if existing_review:
        return jsonify({'message': 'User already has a review for this spot'}), 500


    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        spotId = spot.id

        review = Review(
            stars = form.data['stars'],
            review = form.data['review'],
            userId = current_user.id,
            spotId = spotId
        )

        if not isinstance(review.stars, int) or review.stars < 1 or review.stars > 5:
            return jsonify({'message': 'Stars must be an integer from 1 to 5', 'errors': {'stars': 'Stars must be an integer from 1 to 5'} }), 400

        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    return {"message": "Validation Error","statusCode": 400,'errors': validation_errors_to_error_messages(form.errors)}, 400


# get all the reviews by a spot's id
@spot_routes.route('/<int:id>/reviews', methods=['GET'])
def spotReviews(id):

    reviews = Review.query.filter_by(spotId=id).all()

    # userInfo = User.query.get(current_user.id)

    if reviews is None:
        return {"message": "No reviews found for the spot"}, 404

    # reviews_data = [review.to_dict() for review in reviews]

    reviews_data = []

    for review in reviews:
        userInfo = review.user

        reviews_data.append({
            "createdAt": review.createdAt,
            "id": review.id,
            "review": review.review,
            "spotId": review.spotId,
            "stars": review.stars,
            "updatedAt": review.updatedAt,
            "User": {
                'id': userInfo.id,
                'firstName': userInfo.firstName,
                'lastName': userInfo.lastName
            }
        })
    return {"Reviews": reviews_data}, 200
