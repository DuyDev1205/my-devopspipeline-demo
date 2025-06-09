from app import app

def test_sum():
    client = app.test_client()
    response = client.get("/api/sum?a=2&b=3")
    assert response.status_code == 200
    assert response.get_json() == {"result": 5}

def test_greet():
    client = app.test_client()
    response = client.get("/api/greet/Duy")
    assert response.status_code == 200
    assert response.get_json() == {"message": "Chào mừng, Duy!"}

def test_add_name_success():
    client = app.test_client()
    response = client.post("/api/names", json={"name": "An"})
    assert response.status_code == 200
    data = response.get_json()
    assert "An" in data["names"]
    assert data["message"] == "Tên đã được thêm"

def test_add_name_fail():
    client = app.test_client()
    response = client.post("/api/names", json={})  # Không có name
    assert response.status_code == 400
    assert response.get_json()["error"] == "Thiếu tên"

def test_get_names():
    client = app.test_client()
    # Add tên trước để test GET
    client.post("/api/names", json={"name": "Bình"})
    response = client.get("/api/names")
    assert response.status_code == 200
    assert "Bình" in response.get_json()
