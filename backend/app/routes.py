from flask import Blueprint, jsonify, request
from .models import Experience, User, City, ExperienceImage
from . import db

main = Blueprint("main", __name__)

@main.route("/api/experiences", methods=["GET"])
def get_experiences():
    experiences = Experience.query.all()
    return jsonify([exp.to_dict() for exp in experiences])

@main.route("/api/experiences", methods=["POST"])
def create_experience():
    data = request.get_json()
    
    # Create or get city
    city = None
    if data.get('city_name') and data.get('city_country'):
        city = City.query.filter_by(name=data['city_name'], country=data['city_country']).first()
        if not city:
            city = City(name=data['city_name'], country=data['city_country'], state=data.get('city_state'))
            db.session.add(city)
            db.session.flush()
    
    # Create or get host
    host = None
    if data.get('host_name') and data.get('host_email'):
        host = User.query.filter_by(email=data['host_email']).first()
        if not host:
            host = User(name=data['host_name'], email=data['host_email'], role='host')
            db.session.add(host)
            db.session.flush()
    
    # Create experience
    experience = Experience(
        title=data['title'],
        short_description=data['short_description'],
        long_description=data['long_description'],
        price=float(data['price']),
        duration=data.get('duration'),
        city_id=city.id if city else None,
        host_id=host.id if host else None
    )
    db.session.add(experience)
    db.session.flush()
    
    # Add image if provided
    if data.get('image_url'):
        image = ExperienceImage(experience_id=experience.id, url=data['image_url'])
        db.session.add(image)
    
    db.session.commit()
    return jsonify(experience.to_dict()), 201