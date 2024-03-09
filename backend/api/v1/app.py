import sys
import os

current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
grandparent_dir = os.path.abspath(os.path.join(parent_dir, os.pardir))

sys.path.append(grandparent_dir)

from flask import Flask, jsonify
from extensions import db, jwt
from api.v1.views.auth import auth_bp
from api.v1.views.users import user_bp
from api.v1.views.posts import post_bp
from api.v1.views.contacts import contact_bp
from api.v1.views.users import User
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

app.config.from_prefixed_env()

#intialize extentions
db.init_app(app)
jwt.init_app(app)

#register blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(post_bp, url_prefix="/posts")
app.register_blueprint(contact_bp, url_prefix="/contact")

#load user
@jwt.user_lookup_loader
def user_lookup_callback(jwt_headers, jwt_data):
    identity = jwt_data.get("sub")
    return User.query.filter_by(id=identity).one_or_none()

#additional claims
@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "04a49b6f-eeca-45d2-b980-da02d622d6f6":
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
    app.run()