from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Database configuration (SQLite file)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///experiences.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)

    # Import models to ensure they're registered
    from . import models
    
    # Import and register routes
    from .routes import main
    app.register_blueprint(main)
    
    # Create tables
    with app.app_context():
        db.create_all()

    return app