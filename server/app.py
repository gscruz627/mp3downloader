import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from waitress import serve
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db.init_app(app)

from models import User
with app.app_context():
    db.create_all()

from main import main as main_blueprint
from auth import auth as auth_blueprint

app.register_blueprint(main_blueprint)
app.register_blueprint(auth_blueprint)

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port='80', url_scheme="https")
