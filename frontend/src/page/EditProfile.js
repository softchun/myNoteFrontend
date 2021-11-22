import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Card, Box, TextField } from '@mui/material';

import NavBar from '../component/Navbar';

const baseURL = 'http://localhost:5000';

function EditProfile() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: 'xxxxxxxx'
    })

    useEffect(() => {
        axios.get(`${baseURL}/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => {
                if (res.status === 403){
                    localStorage.removeItem("token");
                }
                setData({
                    username: res.data.username,
                    email: res.data.email
                })
            });
    }, []);

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

        const { username } = data;

        if (username === "") {
            alert("Please fill out.");
            return;
        }

        axios
            .post(`${baseURL}/user/edit`,
                {
                    username: username
                }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                if (res.status === 403){
                    localStorage.removeItem("token");
                    navigate('/login');
                }
                if (res.data.message) {
                    alert(res.data.message);
                    return;
                }
                window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleBack(e) {
        e.preventDefault();

        navigate('/home');
    }

    return (
        <div>
            <NavBar />
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
                                Edit Profile
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
                                    value={data.username}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <Box fontWeight={600}>
                                    Email address
                                </Box>
                                <TextField
                                    disabled
                                    id="outlined-required"
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                />
                            </Box>
                            <Box>
                                <Box fontWeight={600}>
                                    Password
                                </Box>
                                <TextField
                                    disabled
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name="password"
                                    value='xxxxxxxx'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={3}
                                marginTop={2}
                            >
                                <Grid item>
                                    <Button type="submit" onClick={handleBack} style={{ backgroundColor: '#212529', color: 'white', width: 100, height: 35 }}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#212529', color: 'white', width: 100, height: 35 }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Box>
        </div>
    )
}

export default EditProfile