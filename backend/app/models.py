from datetime import datetime
from . import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="customer")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    experiences = db.relationship("Experience", backref="host", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class City(db.Model):
    __tablename__ = "cities"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    experiences = db.relationship("Experience", backref="city", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "state": self.state,
            "latitude": self.latitude,
            "longitude": self.longitude
        }


class Experience(db.Model):
    __tablename__ = "experiences"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    short_description = db.Column(db.String(300), nullable=False)
    long_description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    city_id = db.Column(db.Integer, db.ForeignKey("cities.id"), nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    images = db.relationship("ExperienceImage", backref="experience", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "short_description": self.short_description,
            "long_description": self.long_description,
            "price": self.price,
            "duration": self.duration,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "city": self.city.to_dict() if self.city else None,
            "host": self.host.to_dict() if self.host else None,
            "images": [img.to_dict() for img in self.images]
        }


class ExperienceImage(db.Model):
    __tablename__ = "experience_images"
    id = db.Column(db.Integer, primary_key=True)
    experience_id = db.Column(db.Integer, db.ForeignKey("experiences.id"), nullable=False)
    url = db.Column(db.String(300), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url
        }
