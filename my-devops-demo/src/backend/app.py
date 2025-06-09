from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

FILENAME = "data.json"

if os.path.exists(FILENAME):
    with open(FILENAME, "r") as f:
        names = json.load(f)
else:
    names = []

@app.route("/api/names", methods=["GET"])
def get_names():
    return jsonify(names)

@app.route("/api/names", methods=["POST"])
def add_name():
    data = request.get_json()
    name = data.get("name")
    if name and name not in names:
        names.append(name)
        with open(FILENAME, "w") as f:
            json.dump(names, f)
        return jsonify({"message": "Tên đã được thêm", "names": names})
    return jsonify({"error": "Thiếu tên hoặc đã tồn tại"}), 400

@app.route("/api/names/<string:old_name>", methods=["PUT"])
def update_name(old_name):
    data = request.get_json()
    new_name = data.get("name")
    if old_name in names and new_name:
        idx = names.index(old_name)
        names[idx] = new_name
        with open(FILENAME, "w") as f:
            json.dump(names, f)
        return jsonify({"message": f"Đã cập nhật '{old_name}' thành '{new_name}'", "names": names})
    return jsonify({"error": "Tên không tồn tại hoặc tên mới thiếu"}), 400

@app.route("/api/names/<string:name>", methods=["DELETE"])
def delete_name(name):
    if name in names:
        names.remove(name)
        with open(FILENAME, "w") as f:
            json.dump(names, f)
        return jsonify({"message": f"Đã xóa '{name}'", "names": names})
    return jsonify({"error": f"Tên '{name}' không tồn tại"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
