import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setItems([...items, input]);
      setInput('');
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
          onKeyDown={handleKeyDown} // Bắt sự kiện Enter
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
