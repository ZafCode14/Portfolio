import sys
import os

current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
grandparent_dir = os.path.abspath(os.path.join(parent_dir, os.pardir))

sys.path.append(grandparent_dir)

from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt
from api.v1.views.auth import auth_bp
from api.v1.views.users import user_bp
from api.v1.views.posts import post_bp
from api.v1.views.contacts import contact_bp
from api.v1.views.chat import chat_bp
from api.v1.views.users import User
from dotenv import load_dotenv
from flask_socketio import SocketIO, join_room, leave_room, emit


# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on('join')
def on_join(data):
    room = data['room']
    username = data['username']
    if room != "":
        join_room(room)
        emit('online', {
            "logged_in": True,
            "username": username
            }, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    if room != "":
        leave_room(room)
        emit('online', {
            "logged_in": False,
            "username": username
            }, room=room)

@socketio.on('message')
def handle_chat_message(data):
    username = data['username']
    user_id = data['user_id']
    message = data['message']
    room = data['room']
    emit('message', {
        "type": "msg",
        "new": True,
        "user_id": user_id,
        "username": username,
        "room_id": room,
        "message": message
        } , room=room)

app.config.from_prefixed_env()
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

#intialize extentions
db.init_app(app)
jwt.init_app(app)

#register blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(post_bp, url_prefix="/posts")
app.register_blueprint(contact_bp, url_prefix="/contact")
app.register_blueprint(chat_bp, url_prefix="/chat")

#load user
@jwt.user_lookup_loader
def user_lookup_callback(jwt_headers, jwt_data):
    identity = jwt_data.get("sub")
    return User.query.filter_by(id=identity).one_or_none()

#additional claims
@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "2ba8dc31-8392-4d14-90ee-4404463d9398":
        return {"is_staff": True}
    return {"is_staff": False}

#jwt error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Signature varification failed", "error": "invalid_token"}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message": "request does not contain a valid token", "error": "authorization required"}), 401


if __name__ == "__main__":
    socketio.run(app)