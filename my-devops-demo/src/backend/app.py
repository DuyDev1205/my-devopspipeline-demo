from flask import Flask, request, jsonify

app = Flask(__name__)
import json, os

FILENAME = "data.json"

if os.path.exists(FILENAME):
    with open(FILENAME, "r") as f:
        names = json.load(f)
else:
    names = []

@app.route("/api/names", methods=["GET", "POST"])
def handle_names():
    if request.method == "POST":
        data = request.get_json()
        name = data.get("name")
        if name:
            names.append(name)
            with open(FILENAME, "w") as f:
                json.dump(names, f)
            return jsonify({"message": "Tên đã được thêm", "names": names})
        return jsonify({"error": "Thiếu tên"}), 400
    return jsonify(names)


@app.route("/api/sum")
def handle_sum():
    a = int(request.args.get("a", 0))
    b = int(request.args.get("b", 0))
    return {"result": a + b}

@app.route("/api/greet/<user>")
def greet(user):
    return {"message": f"Chào mừng, {user}!"}

if __name__ == "__main__":
    app.run(debug=True)
