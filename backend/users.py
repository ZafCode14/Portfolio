from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models.user import User

user_bp = Blueprint(
    'users', 
    __name__
)

@user_bp.get('/all')
@jwt_required()
def get_all_users():
    claims = get_jwt()
    if claims.get("is_staff") == True:
        users = User.query.all()
        user_list = [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "firsName": user.firstName,
                "lastName": user.lastName
            } for user in users
        ]
        return jsonify(user_list), 200
    return jsonify({"message": "you are not authorized to access this"}), 401


@user_bp.put("/edit/<user_id>")
@jwt_required()
def edit_user(user_id):
    data = request.get_json()
    user = User.get_user_by_id(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.firstName = data.get("firstName", user.firstName)
    user.lastName = data.get("lastName", user.lastName)

    if user and user.check_password(data.get("oldPassword")):
        user.set_password(data.get("newPassword"))

    user.save()

    return jsonify({"message": "User information updated"}), 200