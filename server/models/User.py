from ..app import db

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), unique=True)
    downloads = db.relationship("Download", backref="author", lazy=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password

class Download(db.Model):
    __tablename__="downloads"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    url = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __init__(self,title, url):
        self.title = title
        self.url = url