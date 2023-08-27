from flask import Blueprint, jsonify, request, Response
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
import jwt

auth = Blueprint(__name__)

@auth.route("/register")
def register():

    username = request.form["username"]
    password = request.form["password"]

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User Already Exists"}, 401)
    
    newUser = User(
        username=username, 
        password=generate_password_hash(password, method="sha256")
    )

    db.session.add(newUser)
    db.session.commit()

    return jsonify({"user": newUser}, 201)

@auth.route("/login")
def login():
    username = request.form["username"]
    password = request.form["password"]
    user = User.query.filter_by(username).first()
    if not user:
        return jsonify({"error": "Authentication Error"}, 404)
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Authentication Error"}, 404)
    token = jwt.encode({"user": user}, algorithm="sha256")
    return jsonify({"user" : user, "token":token})
    