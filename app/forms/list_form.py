from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ListForm(FlaskForm):
    listName = StringField('list', validators=[DataRequired()])
