from app import create_app, db
from app.models import Experience

app = create_app()

# Create database tables if not exist
with app.app_context():
    db.create_all()
