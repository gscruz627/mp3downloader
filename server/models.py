from dataclasses import dataclass
from __init__ import db
from flask_login import UserMixin
import json

@dataclass
class User(db.Model, UserMixin):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    downloads = db.relationship("Download", backref="author", lazy=True)
    
    def serialized(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "downloads": [download.serialized() for download in self.downloads]
        }
    
    def __init__(self, username, password):
        self.username = username
        self.password = password

@dataclass
class Download(db.Model):
    __tablename__="downloads"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    download_author = db.Column(db.String(255))
    url = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def serialized(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "download_author": self.download_author,
            "user": self.owner_id
        }

    def __init__(self,title, download_author, url, author):
        self.title = title
        self.url = url
        self.download_author = download_author
        self.owner_id = author.id