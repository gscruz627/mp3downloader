from flask import Blueprint

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return "hello world"


'''from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import getenv
import routes
from auth import auth as auth_print

app = Flask(__name__)

db = SQLAlchemy(app)
app.db = db

#app.register_blueprint()
app.register_blueprint(auth_print)


if __name__ == "__main__":
    with app.app_context():
        print("Recreating database tables")
        db.create_all()
    app.run(port=8000, debug=True)
'''