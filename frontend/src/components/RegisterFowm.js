import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Container, Paper, Typography } from '@mui/material';

function RegisterForm () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password}),
        });

        const data = await response.json();

        if(response.ok) {
            alert('Регистрация успешна! ойдите в систему.');
            navigate('/');
        }else {
            alert(data.error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '40px'}}>
                <Typography variant="h4" component="h1" align="center">Регистрация</Typography>
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
                    <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop: '20px'}}>
                        Зарегестрироваться
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default RegisterForm