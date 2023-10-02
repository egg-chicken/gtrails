from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email
        }

    locations = db.relationship('Location', back_populates="user")
    reviews = db.relationship('Review', back_populates="user")


class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float, nullable=False)
    elevGain = db.Column(db.Integer, nullable=False)
    routeType = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def calculate_average_rating(self):
        if not self.reviews:
            return None

        total_stars = sum(review.stars for review in self.reviews)
        avg_rating = total_stars / len(self.reviews)
        return avg_rating

    def to_dict(self):
        avg_rating = self.calculate_average_rating()

        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'lat': self.lat,
            'lng': self.lng,
            'description': self.description,
            'length': self.length,
            'elevGain': self.elevGain,
            'routeType': self.routeType,
            'image': self.image,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'avgRating': avg_rating
        }

    user = db.relationship('User', back_populates='locations')
    # review = db.relationship('Review', back_populates='locations')
    reviews = db.relationship('Review', back_populates='location')


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    locationId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('locations.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'locationId': self.locationId,
            'review': self.review,
            'stars': self.stars,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    user = db.relationship('User', back_populates='reviews')
    # locations = db.relationship('Location', back_populates='review')
    location = db.relationship('Location', back_populates='reviews')
