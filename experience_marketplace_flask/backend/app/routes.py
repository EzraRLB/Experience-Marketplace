from flask import Blueprint, jsonify
from .models import Experience

main = Blueprint("main", __name__)

@main.route("/api/experiences", methods=["GET"])
def get_experiences():
    experiences = Experience.query.all()
    return jsonify([exp.to_dict() for exp in experiences])
