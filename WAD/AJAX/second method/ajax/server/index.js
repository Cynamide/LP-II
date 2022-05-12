const express = require('express');

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    res.status(200).json({'message': 'request received'});
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})