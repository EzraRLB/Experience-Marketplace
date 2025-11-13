from app import create_app, db, bcrypt
from app.models import User

app = create_app()

with app.app_context():
    # Get all users
    users = User.query.all()
    
    for user in users:
        # Skip users with null passwords
        if user.password is None:
            print(f"Skipping user with null password: {user.email}")
            continue
            
        # Check if password is already hashed (bcrypt hashes start with $2b$)
        if not user.password.startswith('$2b$'):
            # Hash the plain text password
            hashed_password = bcrypt.generate_password_hash(user.password).decode('utf-8')
            user.password = hashed_password
            print(f"Encrypted password for user: {user.email}")
        else:
            print(f"Password already encrypted for user: {user.email}")
    
    # Commit all changes
    db.session.commit()
    print("Password encryption completed!")