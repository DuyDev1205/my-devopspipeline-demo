import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setItems([...items, input]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React CI/CD Demo</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tên..."
      />
      <button onClick={handleAdd}>Thêm</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
