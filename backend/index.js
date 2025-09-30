const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let rooms = [101, 102, 103, 104, 105];
let reservations = [];

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/reservations', (req, res) => {
  const { name, room } = req.body;
  if (!name || !room || !rooms.includes(Number(room))) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  reservations.push({ name, room });
  res.json({ name, room });
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
