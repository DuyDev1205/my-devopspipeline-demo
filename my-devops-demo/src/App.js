import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://my-devopspipeline-demo.onrender.com/api/names';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Lỗi khi lấy danh sách tên:', err));
  }, []);

  const handleAdd = () => {
    if (input.trim() !== '') {
      fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.names);
          setInput('');
        })
        .catch((err) => console.error('Lỗi khi thêm tên:', err));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleDelete = (name) => {
    fetch(`${API}/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => setItems(data.names));
  };

  const handleEdit = (name) => {
    setEditMode(name);
    setEditInput(name);
  };

  const handleSave = (oldName) => {
    if (!editInput.trim()) return;
    fetch(`${API}/${encodeURIComponent(oldName)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.names);
        setEditMode(null);
      });
  };

  return (
    <div className="container">
      <h1>React CI/CD Demo</h1>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tên..."
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <ul>
        {items.map((name, index) => (
          <li key={index}>
            {editMode === name ? (
              <>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <div className="button-group">
                  <button onClick={() => handleSave(name)}>💾</button>
                  <button onClick={() => setEditMode(null)}>❌</button>
                </div>
              </>
            ) : (
              <>
                <span>{name}</span>
                <div className="button-group">
                  <button onClick={() => handleEdit(name)}>✏️</button>
                  <button onClick={() => handleDelete(name)}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
