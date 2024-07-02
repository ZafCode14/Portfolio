from extensions import db
from uuid import uuid4
from datetime import datetime
from models.association import user_room_association


class Room(db.Model):
    __tablename__ = "rooms"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    created_at = db.Column(db.String(255), default=lambda: datetime.utcnow())
    users = db.relationship('User', secondary=user_room_association, back_populates='rooms')


    @classmethod
    def get_room_by_id(cls, id):
        return cls.query.get(id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()