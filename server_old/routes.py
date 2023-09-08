from models import User, Download
from flask import Blueprint

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return "hello world"