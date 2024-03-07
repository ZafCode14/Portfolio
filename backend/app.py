from flask import Flask, jsonify
from extensions import db, jwt
from auth import auth_bp
from users import user_bp
from posts import post_bp
from contacts import contact_bp
from models.user import User


def create_app():

    app = Flask(__name__)

    app.config.from_prefixed_env()
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Pama0144558688.@localhost:3306/portfolio'

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
        if identity == "d444c937-2cf5-44da-bc69-a71671e1023f":
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

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()