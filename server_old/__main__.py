from flask import Flask
from .main import main

app = Flask(__name__)
app.register_blueprint(main)

app.run(debug=True, port=8000)