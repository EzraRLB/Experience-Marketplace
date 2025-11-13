from flask import Blueprint, jsonify, request
from .models import Experience, User, City, ExperienceImage
from . import db, bcrypt

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

@main.route("/api/cities", methods=["GET"])
def get_cities():
    cities = db.session.query(City.name).distinct().all()
    return jsonify([city[0] for city in cities])

@main.route("/api/countries", methods=["GET"])
def get_countries():
    countries = db.session.query(City.country).distinct().all()
    return jsonify([country[0] for country in countries if country[0]])

@main.route("/api/states", methods=["GET"])
def get_states():
    states = db.session.query(City.state).distinct().all()
    return jsonify([state[0] for state in states if state[0]])

@main.route("/api/experiences/<int:experience_id>", methods=["DELETE"])
def delete_experience(experience_id):
    experience = Experience.query.get_or_404(experience_id)
    
    # Delete related images first
    ExperienceImage.query.filter_by(experience_id=experience_id).delete()
    
    # Then delete the experience
    db.session.delete(experience)
    db.session.commit()
    return '', 204

@main.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"success": True, "user": user.to_dict()}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@main.route("/api/experience-locations", methods=["GET"])
def get_experience_locations():
    experiences = Experience.query.all()
    locations = []
    
    for exp in experiences:
        if exp.city and exp.city.latitude and exp.city.longitude:
            locations.append({
                'id': exp.id,
                'title': exp.title,
                'city': exp.city.name,
                'country': exp.city.country,
                'lat': exp.city.latitude,
                'lng': exp.city.longitude
            })
    
    return jsonify(locations)