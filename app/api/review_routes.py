from flask import Blueprint, jsonify, request
from app.models import User, Spot, Review, db
from app.forms.review_form import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required, login_user

review_routes = Blueprint('reviews', __name__)

# get all the reviews of the current user
@review_routes.route('/created', methods=['GET'])
@login_required
def userReviews():
    currentUserReviews = Review.query.filter_by(userId = current_user.id).all()

    nameInfo = Spot.query.get(current_user.id)

    reviewInfo = []

    for review in currentUserReviews:
        nameInfo = review.spot
        reviewInfo.append({
            'id': review.id,
            'spotName': nameInfo.name,
            'review': review.review,
            'stars': review.stars
        })

    return {'reviews': reviewInfo}


# return details of a review based on id
@review_routes.route('/<int:id>', methods=['GET'])
def idReviews(id):

    review = Review.query.get(id)

    if review is None:
        return {'message': "Review couldn\'t be found", "status code": 404}

    return review.to_dict()


# edit a review
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def editReview(id):

    review = Review.query.get(id)

    if review is None:
        return {'message': "Review couldn't be found"}, 404

    current_user_id = current_user.id

    if review.userId != current_user_id:
        return {'message': 'You are not authorized to edit this review'}, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.stars = form.data['stars']
        review.review = form.data['review']

        if not isinstance(review.stars, int) or review.stars < 1 or review.stars > 5:
            return {'message': 'Stars must be an integer from 1 to 5', 'errors': {'stars': 'Stars must be an integer from 1 to 5'}}, 400

        db.session.commit()
        return review.to_dict()


    return {"message": "Validation Error","statusCode": 400,'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):

    review = Review.query.get(id)

    if review is None:
        return {'message': "Review couldn\'t be found", "statusCode": 404}

    if review.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    db.session.delete(review)
    db.session.commit()

    return { "message": 'Successfully deleted', "statusCode": 200}
