import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [name, setName] = useState('');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
    fetch('http://localhost:3001/reservations')
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  const handleReserve = () => {
    if (!name || !selectedRoom) return;
    fetch('http://localhost:3001/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, room: selectedRoom })
    })
      .then(res => res.json())
      .then(data => setReservations([...reservations, data]));
  };

  return (
    <div className="app-container">
  <h1>Hotel Adam's Garden</h1>
      <input
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select
        value={selectedRoom}
        onChange={e => setSelectedRoom(e.target.value)}
      >
        <option value="">Selecione o quarto</option>
        {rooms.map(room => (
          <option key={room} value={room}>{room}</option>
        ))}
      </select>
      <button onClick={handleReserve}>
        Reservar
      </button>
      <h2>Reservas</h2>
      <ul>
        {reservations.map((r, i) => (
          <li key={i}>{r.name} - Quarto {r.room}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
