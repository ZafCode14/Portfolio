from extensions import db
from uuid import uuid4
from datetime import datetime


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    main = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.String(255), default=lambda: datetime.utcnow())
    updated_at = db.Column(db.String(255), default=lambda: datetime.utcnow())
    edited = db.Column(db.Boolean, default=False)
    
    @classmethod
    def get_post_by_id(cls, id):
        return cls.query.filter_by(created_at=id).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()