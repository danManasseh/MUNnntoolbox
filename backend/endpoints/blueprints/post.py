import sqlite3
import uuid

from flask import Blueprint, request, jsonify

sample_blueprint = Blueprint("post", __name__)

db_path = "endpoints/instance/db.sqlite3"


@sample_blueprint.route('/sample/post', methods=['POST'])
def create_post():
    data = request.get_json()
    new_id = uuid.uuid4()

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute(f"insert into post (id, title, description, created) values ('{new_id}','{data['title']}','{data['description']}','{data['created']}')")
    cursor.execute(f"select * from post where id='{new_id}'")

    values = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()

    new_post = [dict(i) for i in values]

    return jsonify({
        "status": True,
        "message": "Post is created successfully!",
        "post": new_post
    })


@sample_blueprint.route('/sample/post', methods=['GET'])
def list_posts():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("select * from post")
    values = cursor.fetchall()
    cursor.close()
    conn.close()

    posts = [dict(i) for i in values]

    return jsonify({
        "status":True,
        "posts":posts
    })


@sample_blueprint.route('/sample/post', methods=['PUT'])
def update_post():
    data = request.get_json()

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute(f"update post set title='{data['title']}',description='{data['description']}',created='{data['created']}' where id='{data['id']}'")
    cursor.execute(f"select * from post where id='{data['id']}'")
    values = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()

    post = [dict(i) for i in values]

    return jsonify({
        "status":True,
        "message":"Post is updated successfully!",
        "post":post
    })


@sample_blueprint.route('/sample/post', methods=['DELETE'])
def delete_post():
    data = request.get_json()

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f"delete from post where id='{data['id']}'")
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "status":True,
        "message":"Post is deleted successfully!"
    })