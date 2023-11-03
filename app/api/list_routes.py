from flask import Blueprint, jsonify, request
from app.models import Location, List, list_location, db
from flask_login import current_user, login_required
from app.forms.list_form import ListForm
from sqlalchemy import and_
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

# Return all lists created by user
@list_routes.route('/created', methods=['GET'])
@login_required
def getUserLists():

    currentUserLists = List.query.filter(current_user.id == List.userId)

    return jsonify({"lists": [each.to_dict() for each in currentUserLists]})


# Return the details of a list based on id
@list_routes.route('/<int:id>', methods=['GET'])
def getListId(id):

    list = List.query.get(id)

    if list is None:
        return {'message': "List couldn\'t be found", "statusCode": 404}

    listDetails = list.to_dict()
    listDetails["locations"] = []
    for location in list.locations:
        listDetails["locations"].append(location.to_dict())

    return listDetails


# Create a list
@list_routes.route('/new', methods=['POST'])
@login_required
def createList():

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = List(
            listName=form.data['listName'],
            userId=current_user.id,
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# Edit a list
@list_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def editList(id):

    list = List.query.get(id)

    if list is None:
        return {'message': "List couldn\'t be found", "statusCode": 404}

    if list.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list.listName = form.data['listName']

        db.session.add(list)
        db.session.commit()
        return list.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


# Delete a list
@list_routes.route('/<int:id>/del', methods=['DELETE'])
@login_required
def delete(id):

    list = List.query.get(id)

    if list is None:
        return {'message': "List couldn\'t be found", "statusCode": 404}

    if list.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    db.session.delete(list)
    db.session.commit()

    return {"message": 'Successfully deleted', "statusCode": 200}


# Add a location to a list based on list id
@list_routes.route('/<int:listId>/locations/<int:locationId>', methods=['POST'])
@login_required
def addLocationToList(listId, locationId):

    list_Id = List.query.get(listId)
    location_Id = Location.query.get(locationId)

    if list_Id is None:
        return {'errors': ["List couldn't be found"]}, 404

    if location_Id is None:
        return {'errors': ["Location couldn't be found"]}, 404

    existing_entry =  db.session.query(list_location).filter_by(listId=listId, locationId=locationId).first()

    if existing_entry:
        return {'error': "Location is already in the list"}, 400

    new_location = list_location.insert().values(
        listId=listId, locationId=locationId
    )

    db.session.execute(new_location)
    db.session.commit()

    return {'message': "Success"}, 200


# Remove a location to a list based on list id
@list_routes.route('/<int:listId>/locations/<int:locationId>', methods=["DELETE"])
@login_required
def removeLocation(listId, locationId):

    list_Id = List.query.get(listId)
    location_Id = Location.query.get(locationId)

    if list_Id is None:
        return {'errors': ["List couldn't be found"]}, 404

    if location_Id is None:
        return {'errors': ["Location couldn't be found"]}, 404

    db.session.query(list_location).filter(and_(list_location.c.listId == listId, list_location.c.locationId == locationId)).delete()
    db.session.commit()
    return {'message': "Successfully deleted"}, 200
