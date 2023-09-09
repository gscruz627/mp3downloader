from flask import Blueprint, Response, request, jsonify
from flask_cors import cross_origin
from .models import Download, User
import jwt
from . import db
from os import getenv
from dotenv import load_dotenv
load_dotenv()


main = Blueprint("main", __name__)

JWT_SECRET_KEY = getenv("JWT_SECRET")
CLIENT_URL = getenv("CLIENT_URL")


@main.route("/")
def homepage():
    return "Oh, Hello There"


@main.route("/downloads/<int:user_id>")
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def downloads(user_id):
    token = request.headers.get("Authorization")
    if token.startswith("Bearer "):
        token = token[7:]
        if jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"]):
            downloads = Download.query.filter_by(owner_id=user_id)
            serialized_downloads = []
            for download in downloads:
                serialized_downloads.append(download.serialized())
            return serialized_downloads
        else:
            return Response("Invalid Token, User may not exist", 400)
    else:
        return Response("Deformed Token", 400)


@main.route("/newdownload", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def newdownload():
    owner_id = request.json["user_id"]
    title = request.json["title"]
    download_author = request.json["download_author"]
    url = request.json["url"]

    user = User.query.filter_by(id=owner_id).first()
    download = Download(
        title=title, url=url, download_author=download_author, author=user
    )
    db.session.add(download)
    db.session.commit()
    if not user:
        return Response("User not found, please authenticate", 403)

    if not download:
        return Response("Defect Download, please try again", 400)

    return jsonify({download: download.serialized()}, 201)