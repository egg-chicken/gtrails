from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired


class LocationForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    difficulty = StringField('difficulty', validators=[DataRequired()])
    length = FloatField('length', validators=[DataRequired()])
    elevGain = IntegerField('elevGain', validators=[DataRequired()])
    routeType = StringField('routeType', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
