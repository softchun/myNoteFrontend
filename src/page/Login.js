import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Card, Box, TextField, Link } from '@mui/material';

const baseURL = process.env.REACT_APP_BACKEND_URL;

function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { target } = e;
        const { name } = target;
        const value = target.value;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = data;

        if (email === "" || password === "") {
            alert("Please fill out.");
            return;
        }

        axios
            .post(`${baseURL}/auth/login`,
                {
                    email: email,
                    password: password
                })
            .then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                    return;
                }
                localStorage.setItem("token", res.data.token);
                navigate('/home');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <Box bgcolor='#212529' style={{ height: '100vh' }}>
            <Grid container direction="column" alignItems="center" justify="center">
            <Card sx={{ width: 600, height: 500, backgroundColor: '#ffffff', marginTop: 10}}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box fontSize={40} margin={5} fontWeight={700}>
                        LOGIN
                    </Box>
                    <Box fontWeight={600}>
                        Email address
                    </Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <Box>
                        <Box fontWeight={600}>
                            Password
                        </Box>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            onChange={handleChange}
                        />
                    </Box>
                    <Box margin={3}>
                        <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#212529', color: 'white', width: 100, height: 35 }}>
                            Submit
                        </Button>
                        <Grid container direction="row" justifyContent="center" marginTop={2}>
                            Don't have an account?&nbsp;
                            <Link href="/register" underline="hover"> Create</Link>
                        </Grid>
                    </Box>
                </Box>
            </Card>
            </Grid>
            </Box>
        </div>
    )
}

export default Login
