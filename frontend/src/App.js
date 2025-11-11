import React, { useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] =useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/greet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if(response.ok) {
      setMessage(data.message);
    }else {
      setMessage('Ошибка: ' + data.error);
    }
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>Приветствие</h1>
      <form onSubmit={handleSubmit}>
        <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
           placeholder="Введите ваше имя"
           />
           <button type="submit">Отправить</button>
      </form>

      {message && <h2>{message}</h2>}
    </div>
  );
}

export default App;