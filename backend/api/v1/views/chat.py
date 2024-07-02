from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.message import Message, NewMessage
from models.room import Room
from models.user import User


chat_bp = Blueprint(
    'chat', 
    __name__
)

@chat_bp.post('/room/create')
def add_room():
    data = request.get_json()
    user1 = User.get_user_by_id(data.get("first_user_id"))
    user2 = User.get_user_by_id(data.get("second_user_id"))

    # Check if a room with the same users already exists
    rooms = Room().query.all()

    room_list = [[user.id for user in room.users] for room in rooms]
    print(room_list)

    for room in room_list:
        if user1.id in room and user2.id in room:
            print(user1.id, user2.id)
            return jsonify("Room already exists!"), 409

    new_room = Room()
    new_room.users.append(user1)
    new_room.users.append(user2)

    new_room.save()

    return jsonify({
        "id": new_room.id,
        "created_at": new_room.created_at,
        "users": [user.username for user in new_room.users]
    }), 201

@chat_bp.get('/room/all')
@jwt_required()
def all_rooms():
    rooms = Room().query.all()

    room_obj = {
        room.id: {
            "users": [user.id for user in room.users]
        } for room in rooms}

    return jsonify(room_obj), 201

@chat_bp.post('/message/create')
@jwt_required()
def add_message():
    data = request.get_json()
    new_message = Message()
    new_message.message = data.get("message")
    new_message.user_id = data.get("user_id")
    new_message.room_id = data.get("room_id")

    new_message.save()

    return jsonify({
        "id": new_message.id,
        "message": new_message.message,
        "room_id": new_message.room_id,
        "user_id": new_message.user_id,
        "created_at": new_message.created_at,
    }), 201

@chat_bp.get('/message/all')
@jwt_required()
def all_messages():
    messages = Message.query.order_by(Message.created_at.asc()).all()

    msg_list = [
        {
            "message": msg.message,
            "id": msg.id,
            "room_id": msg.room_id,
            "user_id": msg.user_id,
            "created_at": msg.created_at,
        } for msg in messages]

    return jsonify(msg_list), 201

@chat_bp.post('/new_message/create')
@jwt_required()
def add_new_message():
    data = request.get_json()
    new_message = NewMessage()
    new_message.message_id = data.get("message_id")
    new_message.user_id = data.get("user_id")
    new_message.room_id = data.get("room_id")

    new_message.save()

    return jsonify({
        "message_id": new_message.message_id,
        "user_id": new_message.user_id,
        "room_id": new_message.room_id,
        "new": new_message.new
    }), 201

@chat_bp.get('/new_message/all')
@jwt_required()
def all_new_messages():
    messages = NewMessage.query.all()

    msg_list = [
        {
            "message_id": msg.message_id,
            "user_id": msg.user_id,
            "room_id": msg.room_id,
            "new": msg.new,
        } for msg in messages]

    return jsonify(msg_list), 201

@chat_bp.delete('/delete_new')
@jwt_required()
def delete_from_new():
    data = request.get_json()
    user_id = data.get("user_id")
    room_id = data.get("room_id")
    all_new = NewMessage.query.all()

    deleted = False

    for new in all_new:
        if new.user_id == user_id and new.room_id == room_id:
            new.delete()
            deleted = True
    
    if deleted:
        return jsonify({"message": "new messages deleted!"})
    else:
        return jsonify({"message": "No messages deleted!"})