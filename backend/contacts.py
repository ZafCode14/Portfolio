from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models.contact import Contact


contact_bp = Blueprint(
    'contact', 
    __name__
)

@contact_bp.post("/add")
def contact_message():
    data = request.get_json()
    new_contact = Contact()
    new_contact.name = data.get("name")
    new_contact.email = data.get("email")
    new_contact.message = data.get("message")

    new_contact.save()

    return jsonify({
        "id": new_contact.id,
        "name": new_contact.name,
        "email": new_contact.email,
        "message": new_contact.message
    })

@contact_bp.get("/all")
@jwt_required()
def all_messages():
    claims = get_jwt()
    if claims.get("is_staff") == True:
        messages = Contact.query.order_by(Contact.created_at.desc()).all()
        list_messages = [
            {
                "name": message.name,
                "email": message.email,
                "message": message.message,
                "created_at": message.created_at
            } for message in messages
        ]
        return jsonify(list_messages) 
    return jsonify({"message": "You are not authorized"})