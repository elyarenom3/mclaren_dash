from flask import Flask
from flask_cors import CORS
import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import gridfs
from pymongo import MongoClient

matplotlib.use('Agg')  # Use non-interactive backend

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['myDatabase']
fs = gridfs.GridFS(db)

from flask_app import app  # Import app from app.py

__all__ = ['app']  # Explicitly declare app as a module export
