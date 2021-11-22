import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Card, Box, TextField, Link } from '@mui/material';

const baseURL = 'http://localhost:5000';

function Register() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
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

        const { username, email, password } = data;

        if (username === "" || email === "" || password === "") {
            alert("Please fill out.");
            return;
        }

        axios
            .post(`${baseURL}/auth/register`,
                {
                    username: username,
                    email: email,
                    password: password
                })
            .then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                    return;
                }
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <Box bgcolor='#212529' style={{ height: '100vh' }}>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Card sx={{ width: 600, height: 580, backgroundColor: '#ffffff', marginTop: 10 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box fontSize={40} margin={5} fontWeight={700}>
                                SIGN UP
                            </Box>
                            <Box>
                                <Box fontWeight={600}>
                                    Username
                                </Box>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    name="username"
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
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
                            </Box>
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
                                <Box margin={1}>
                                    Already have an account?
                                    <Link href="/login" underline="hover"> Login</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Box>
        </div>
    )
}

export default Register