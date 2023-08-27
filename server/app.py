from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import getenv
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:Sisnacrack40$@localhost:5432/mp3download"

db = SQLAlchemy(app)
app.config["JWT_SECRET_KEY"] = getenv("JWT_SECRET_KEY")

@app.route("/")
def home():
    return "hello world"

if __name__ == "__main__":
    app.run(port=8000, debug=True)