from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models.contact import Contact
from flask_mail import Mail, Message


contact_bp = Blueprint(
    'contact', 
    __name__
)

@contact_bp.post("/add")
def contact_message():
    from api.v1.app import app

    data = request.get_json()
    new_contact = Contact()
    new_contact.name = data.get("name")
    new_contact.email = data.get("email")
    new_contact.message = data.get("message")
    new_contact.save()

    mail = Mail(app)

    msg = Message(
        subject= "!!! DEVELAPP !!!", 
        sender = 'zafarwp14@gmail.com', 
        recipients = ['zafarwp14@gmail.com'])

    msg.body = "Name: {}\nEmail: {}\n\n{}".format(new_contact.name, new_contact.email, new_contact.message)
    mail.send(msg)


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
                "created_at": message.created_at,
                "id": message.id
            } for message in messages
        ]
        return jsonify(list_messages) 
    return jsonify({"message": "You are not authorized"})

@contact_bp.delete("/delete/<message_id>")
@jwt_required()
def del_message(message_id):
    claims = get_jwt()
    if claims.get("is_staff") == True:
        message = Contact.get_message_by_id(message_id)
        message.delete()

        return jsonify({"message": "Message deleted successfuly"})
    return jsonify({"message": "You are not authorized"})