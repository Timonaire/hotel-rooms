const express = require('express');
const app = express();
const port = 3000;

// Class for the room types with properties codeName, prize
class RoomType {
    constructor(codeName, prize) {
        this.codeName = codeName;
        this.prize = prize;
    }
}

// Array to store RoomType objects
let roomTypes = [];

// Creating many room types
app.post('/room-types', (req, res) => {
    const codeName = req.body.codeName;
    const prize = req.body.prize;

    let roomType = new RoomType(codeName, prize);
    roomTypes.push(roomType);
    res.send(`Room type with code name ${codeName} and prize ${prize} created.`);
});

// Editing a room type using id
app.put('/room-types/:id', (req, res) => {
    const id = req.params.id;
    const codeName = req.body.codeName;
    const prize = req.body.prize;

    let roomType = roomTypes[id];
    roomType.codeName = codeName;
    roomType.prize = prize;
    res.send(`Room type with id ${id} edited.`);
});

// Deleting room type using id
app.delete('/room-types/:id', (req, res) => {
    const id = req.params.id;
    roomTypes.splice(id, 1);
    res.send(`Room type with id ${id} deleted.`);
});

// Fetching single room type using id
app.get('/room-types/:id', (req, res) => {
    const id = req.params.id;
    res.send(roomTypes[id]);
});

// Fetching many room types
app.get('/room-types', (req, res) => {
    res.send(roomTypes);
});

// To search and filter rooms based on its name, types and prices
app.get('/room-types/search', (req, res) => {
    const codeName = req.query.codeName;
    const prize = req.query.prize;

    let filteredRoomTypes = roomTypes.filter((roomType) => {
        return roomType.codeName === codeName && roomType.prize === prize;
    });
    res.send(filteredRoomTypes);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest'
  }
});

module.exports = mongoose.model('User', userSchema);

const { authenticateUser, authorizeUser, validateData } = require('./authMiddleware');

// Creating many room types
app.post('/room-types', authenticateUser, authorizeUser('admin'), validateData, (req, res) => {
  const codeName = req.body.codeName;
  const prize = req.body.prize;

  let roomType = new RoomType(codeName, prize);
  roomTypes.push(roomType);
  res.send(`Room type with code name ${codeName} and prize ${prize} created.`);
});

// Editing a room type using id
app.put('/room-types/:id', authenticateUser, authorizeUser('admin'), validateData, (req, res) => {
  const id = req.params.id;
  const codeName = req.body.codeName;
  const prize = req.body.prize;

  let roomType = roomTypes[id];
  roomType.codeName = codeName;
  roomType.prize = prize;
  res.send(`Room type with id ${id} edited.`);
});

// Deleting room type using id
app.delete('/room-types/:id', authenticateUser, authorizeUser('admin'), (req, res) => {
  const id = req.params.id;
});