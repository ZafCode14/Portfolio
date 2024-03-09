from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, current_user, get_jwt_identity
from models.user import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register_user():
    data = request.get_json()
    user = User.get_user_by_username(data.get("username"))
    user2 = User.get_user_by_username(data.get("email"))

    if user or user2 is not None:
        return jsonify({"error": "User already exists"}), 403

    new_user = User()
    new_user.username = data.get("username"),
    new_user.email = data.get("email")
    new_user.set_password(data.get("password"))
    new_user.save()

    return jsonify({"message": "User Created"}), 201


@auth_bp.post("/login")
def login_user():
    data = request.get_json()

    user = User.get_user_by_username(data.get("username"))

    if user and user.check_password(data.get("password")):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify(
            {
                "accessToken": access_token,
                "refreshToken": refresh_token
            }
        ), 200
    
    return jsonify({"error": "Invalid username or password"}), 400


@auth_bp.get("/whoami")
@jwt_required()
def whoami():
    return jsonify({
        "user_data": {
            "userId": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "firstName": current_user.firstName,
            "lastName": current_user.lastName,
        },
        "claims": get_jwt()
    })


@auth_bp.get("/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)
    return jsonify({"accessToken": new_access_token})