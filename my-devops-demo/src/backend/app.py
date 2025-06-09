from flask import Flask, request, jsonify

app = Flask(__name__)
names = []

@app.route("/api/names", methods=["GET", "POST"])
def handle_names():
    if request.method == "POST":
        data = request.get_json()
        name = data.get("name")
        if name:
            names.append(name)
            return {"message": "Tên đã được thêm", "names": names}
        return {"error": "Thiếu tên"}, 400
    return names

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
