import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Lấy danh sách tên từ API khi load trang
  useEffect(() => {
    fetch('https://my-devopspipeline-demo.onrender.com/api/names')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Lỗi khi lấy danh sách tên:', err));
  }, []);

  // Gửi tên mới lên API khi người dùng thêm
  const handleAdd = () => {
    if (input.trim() !== '') {
      fetch('https://my-devopspipeline-demo.onrender.com/api/names', {
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
        {items.map((item, index) => (
          <li key={index} className="fade-in">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
