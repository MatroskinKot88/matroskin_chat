const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// Секретный ключ для JWT
const JWT_SECRET = 'penis_dominator';

// Регистрация
app.post('/register', async(req, res) => {
    const {name, email, password} = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(409).json({ error: 'Пользователь с таким email не существует'});
        }

        const user = new User({name, email, password});
        await user.save();

        res.status(201).json({message: 'Пользователь успешно зарегестрирован!'});
    } catch (err) {
        res.status(500).json({error: 'Ошибка сервера'});
    }
});

// Вход
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email});
        if(!user) {
            return res.status(401).json({error: 'Неверный email или пароль'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({error: 'Неверный email или пароль'})
        }

        // Создаем JWT токен
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expresIn: 'h1'});
        res.json({message: `Добро пожаловать, ${user.name}!`, token});
    } catch(err){
        res.status(500).json({ error:'Ошибка сервера'});
       }
    });

// Защищенный маршрут -получение профиля
app.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Токен отсутствует'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if(!user) {
            return res.status(404).json ({error: 'Неверный токен'});
        }

        res.json(user);
    } catch (err) {
        res.status(401).json({ error: 'Неверный токен'});
    }
});

// Обновление профиля
app.put ('/profile', async (req,res) => {
    const token = req.authorization?.split(' ')[1];
    const {name, email } = req.body;

    if(!token) {
        return res.status(401).json({error: 'Токен отсутствует'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByIdAndUpdate(decoded.id, {name, email}, {new: true}).select('-password');

        if(!user) {
            return res.status(404).json({error: 'Пользователь не найден'});
        }
        res.json({message: 'Профиль обновлен!'});
    } catch (err) {
        req.status(401).json({error: 'Неверный токен'})
    }
});




// Подключение в MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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



// приветствие
app.post('/greet', (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({ error: 'Имя обязательно'});
    }

    res.json({ message: `Привет, ${name}!`});
});
