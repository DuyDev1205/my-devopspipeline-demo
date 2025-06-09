import React, { useEffect, useState } from "react";

const API = "https://my-devopspipeline-demo.onrender.com/api/names"; // ← API của bạn

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleAdd = () => {
    if (input.trim() === "") return;
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.names);
        setInput("");
      });
  };

  const handleDelete = (name) => {
    fetch(`${API}/${encodeURIComponent(name)}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setItems(data.names));
  };

  const handleEdit = (name) => {
    setEditMode(name);
    setEditInput(name);
  };

  const handleSave = (oldName) => {
    fetch(`${API}/${encodeURIComponent(oldName)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.names);
        setEditMode(null);
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📋 Danh sách tên</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tên"
      />
      <button onClick={handleAdd}>Thêm</button>
      <ul>
        {items.map((name) => (
          <li key={name}>
            {editMode === name ? (
              <>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => handleSave(name)}>💾 Lưu</button>
              </>
            ) : (
              <>
                {name}
                <button onClick={() => handleEdit(name)}>✏️</button>
              </>
            )}
            <button onClick={() => handleDelete(name)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
