import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import{TextField, Button, Container, Paper, Typography} from '@mui/material';
 
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password}),
        });

        const data = await response.json();

        if(response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/profile');
        } else {
            alert(data.error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px', marginTop: '40px'}}>
                <Typography variant="h4" component="h1" align="center">Вход</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop: '20px'}}>
                        Войти
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginForm;