import React, {useState, useEffect} from "react";
import { TextField, Button, Container, Paper, Typography, Alert } from "@mui/material";

function Profile () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Получаем данные профиля
        const token = localStorage.getItem('token');
        if(!token) {
            alert('Сначала войдите в систему');
            window.location.href = '/';
            return;
        }

        fetch('http://localhost:5000/profile', {
            headers: {Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setEmail(data.email);
        })
        .catch(() => {
            alert('Ошибка получения профиля');
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({name, email}),
    });

    const data = await response.json();
    if(response.ok) {
        setMessage('Профиль обновлен!');
        setError('');
    } else {
        setError(data.error);
        setMessage('');
    }
};

    return(
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px', marginTop: '40px'}}>
                <Typography variant="h4" component="h1" align="center">Редактировать профиль</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="Имя"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px'}}>
                        Сохранить
                    </Button>
                </form>

                {message && <Alert severity="success" style={{ marginTop: '20px'}}>{message}</Alert>}
                {error && <Alert severity="error" style={{marginTop: '20px'}}>{error}</Alert>}
            </Paper>
        </Container>
    );
}

export default Profile;