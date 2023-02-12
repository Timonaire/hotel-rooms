const express = require('express');
const app = express();
const port = 3000;

// Room type class with properties codeName, prize
class RoomType {
    constructor(codeName, prize) {
        this.codeName = codeName;
        this.prize = prize;
    }
}

// List to store RoomType objects
let roomTypes = [];

// Route to create many room types
app.post('/room-types', (req, res) => {
    const codeName = req.body.codeName;
    const prize = req.body.prize;

    let roomType = new RoomType(codeName, prize);
    roomTypes.push(roomType);
    res.send(`Room type with code name ${codeName} and prize ${prize} created.`);
});

// Route to edit room type with id
app.put('/room-types/:id', (req, res) => {
    const id = req.params.id;
    const codeName = req.body.codeName;
    const prize = req.body.prize;

    let roomType = roomTypes[id];
    roomType.codeName = codeName;
    roomType.prize = prize;
    res.send(`Room type with id ${id} edited.`);
});

// Route to delete room type with id
app.delete('/room-types/:id', (req, res) => {
    const id = req.params.id;
    roomTypes.splice(id, 1);
    res.send(`Room type with id ${id} deleted.`);
});

// Route to fetch single room type with id
app.get('/room-types/:id', (req, res) => {
    const id = req.params.id;
    res.send(roomTypes[id]);
});

// Route to fetch many room types
app.get('/room-types', (req, res) => {
    res.send(roomTypes);
});

// Route to search and filter rooms based on its name, types and prices
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