from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ActivityForm(FlaskForm):
    activityType = StringField('activity', validators=[DataRequired()])
    trailConditions = StringField('trailConditions', validators=[DataRequired()])
