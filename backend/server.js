const express = require('express');
const cors = require('cors');
const app = express();

// Разрешаем запросы с других портов
app.use(cors()); 
// JSON в теле запроса
app.use(express.json());

// Маршрут для теста
app.get('/', (req, res) => {
    res.json({message: 'Привет с бэкенда.'})
});

// Принимаем ПОСТ запросы с именем
app.post('/greet', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({error: 'Имя обязательно' });
    }

    res.json({ message: `Привет, ${name}!` })
        });
    
const PORT = 5000;
app.listen(PORT, function() {
    console.log(`Бэкенд запущен на http://localhost:${PORT}`);
});
