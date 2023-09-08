from flask import Blueprint, jsonify, request
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from .models import User
import jwt
from dotenv import load_dotenv
load_dotenv()
from os import getenv
auth = Blueprint("auth", __name__)
import json
JWT_SECRET = getenv("JWT_SECRET")
CLIENT_URL = getenv("CLIENT_URL")

@auth.route("/register", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def register():

    username = request.json["username"]
    password = request.json["password"]

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User Already Exists"}, 401)
    
    newUser = User(
        username=username, 
        password=generate_password_hash(password, method="sha256")
    )

    db.session.add(newUser)
    db.session.commit()

    return jsonify({"user": newUser}, 201)

@auth.route("/login", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def login():

    username = request.json["username"]
    password = request.json["password"]
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "Authentication Error"}, 404)
    
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Authentication Error"}, 404)
    
    token = jwt.encode({"user": user.serialized()}, algorithm="HS256", key=JWT_SECRET)
    
    return jsonify({"user" : user.serialized(), "token":token}, 200)    