from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, current_user
from models.post import Post
from datetime import datetime


post_bp = Blueprint(
    'posts', 
    __name__
)

@post_bp.post('/add')
@jwt_required()
def add_post():
    claims = get_jwt()
    if claims.get("is_staff") == True:
        data = request.get_json()

        new_post = Post()
        new_post.title = data.get("title")
        new_post.main = data.get("main")
        new_post.user_id = data.get("user_id", current_user.id)
        new_post.save()

        return jsonify({
            "id": new_post.id,
            "title": new_post.title,
            "main": new_post.main,
            "created_at": new_post.created_at,
            "updated_at": new_post.updated_at,
            "user_id": new_post.user_id,
            "edited": new_post.edited
        }), 201
    return jsonify({"message": "You are not authorized"})


@post_bp.put('/edit/<post_id>')
@jwt_required()
def edit_post(post_id):
    claims = get_jwt()
    if claims.get("is_staff") == True:
        data = request.get_json()

        post = Post.get_post_by_id(post_id)

        post.title = data.get("title", post.title)
        post.main = data.get("main", post.main)
        post.updated_at = datetime.utcnow()

        post.save()

        return jsonify({"message": "Post information Updated"})
    return jsonify({"message": "You are not authorized"})


@post_bp.delete('/delete/<post_id>')
@jwt_required()
def delete_post(post_id):
    claims = get_jwt()
    if claims.get("is_staff") == True:
        post = Post.get_post_by_id(post_id)
        post.delete()

        return jsonify({"message": "Post deleted successfuly"})
    return jsonify({"message": "You are not authorized"})


@post_bp.get('/<post_id>')
def posts(post_id):
    post = Post.get_post_by_id(post_id)
    return jsonify({
        "id": post.id,
        "title": post.title,
        "main": post.main,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
        "user_id": post.user_id,
        "edited": post.edited
    })


@post_bp.get('/all')
def all_posts():
    posts = Post.query.all()

    post_list = {
        post.created_at: {
        "id": post.id,
        "title": post.title, 
        "main": post.main,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
        "user_id": post.user_id,
        "edited": post.edited
    } for post in posts}
    return jsonify(post_list)