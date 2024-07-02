from extensions import db
from uuid import uuid4
from datetime import datetime

class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    room_id = db.Column(db.String(36), db.ForeignKey("rooms.id"), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.String(255), default=lambda: datetime.utcnow())
    updated_at = db.Column(db.String(255), default=lambda: datetime.utcnow())

    @classmethod
    def get_message_by_id(cls, id):
        return cls.query.get(id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class NewMessage(db.Model):
    __tablename__ = "new_messages"
    message_id = db.Column(db.String(36), db.ForeignKey("messages.id"), nullable=False, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False, primary_key=True)
    room_id = db.Column(db.String(36), db.ForeignKey("rooms.id"), nullable=False)
    new = db.Column(db.Boolean, nullable=False, default=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()