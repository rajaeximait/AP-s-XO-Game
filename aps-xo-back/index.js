const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to AP\'s XO Game API');
});

app.use('/api', gameRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
