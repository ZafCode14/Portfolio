from extensions import db


user_room_association = db.Table('user_room',
    db.Column('user_id', db.String(36), db.ForeignKey('users.id'), primary_key=True),
    db.Column('room_id', db.String(36), db.ForeignKey('rooms.id'), primary_key=True)
)