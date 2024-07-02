from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from models.room import Room
from models.message import Message
from models.association import user_room_association


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    firstName = db.Column(db.String(50))
    lastName = db.Column(db.String(50))
    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")
    rooms = db.relationship('Room', secondary=user_room_association, back_populates='users')

    def __repr__(self):
        return f"<User {self.username}"
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_user_by_username(cls, username):
        user = cls.query.filter_by(username=username).first()
        if not user:
            user = cls.query.filter_by(email=username).first()
        return user
    @classmethod
    def get_user_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()