import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Card, Box, TextField, FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';

import NavBar from '../component/Navbar';

const baseURL = process.env.REACT_APP_BACKEND_URL;

function EditNote() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        content: '',
        color: '',
        privacy: ''
    })

    useEffect(() => {

        function FetchProduct(){

            axios.post(`${baseURL}/note`,
            {
                _id: id
            }, {
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
                    title: res.data.title,
                    content: res.data.content,
                    color: res.data.color,
                    privacy: res.data.privacy
                })
            });
        }

        FetchProduct()
        
    }, [id]);

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

        const { title, content, color, privacy } = data;

        if (title === "" || content === "" || color === "" || privacy === "") {
            alert("Please fill out.");
            return;
        }

        axios.post(`${baseURL}/note/edit`,
            {
                _id: id,
                title: title,
                content: content,
                color: color,
                privacy: privacy
            }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                    return;
                }
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleBack(e) {
        e.preventDefault();

        navigate(-1);
    }

    return (
        <div>
            <NavBar />
            <Box bgcolor='#212529' style={{ height: '120vh' }}>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Card sx={{ width: 800, height: 740, backgroundColor: '#EEEEEE', marginTop: 10 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '60ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box fontSize={40} margin={5} fontWeight={700}>
                                Edit Note
                            </Box>
                            <Box fontWeight={600} fontSize={20}>
                                Title
                            </Box>
                            <TextField
                                required
                                id="outlined-required"
                                label="Title"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                            />
                            <Box fontWeight={600} fontSize={20} marginTop={2}>
                                Content
                            </Box>
                            <TextField
                                required
                                id="outlined-multiline-static"
                                label="Content"
                                multiline
                                rows={4}
                                name="content"
                                value={data.content}
                                onChange={handleChange}
                            />
                            <Box fontWeight={600} fontSize={20} marginTop={2}>
                                Privacy
                            </Box>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="privacy"
                                    name="privacy"
                                    value={data.privacy}
                                    defaultValue={data.privacy}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                                </RadioGroup>
                            </FormControl>
                            <Box fontWeight={600} fontSize={20} marginTop={2}>
                                Color Note
                            </Box>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="color"
                                    name="color"
                                    value={data.color}
                                    defaultValue={data.color}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="#b7094c" control={<Radio sx={{
                                        color: '#b7094c',
                                        '&.Mui-checked': { color: '#b7094c' }
                                    }} />} label="" />
                                    <FormControlLabel value="#a01a58" control={<Radio sx={{
                                        color: '#a01a58',
                                        '&.Mui-checked': { color: '#a01a58' }
                                    }} />} label="" />
                                    <FormControlLabel value="#892b64" control={<Radio sx={{
                                        color: '#892b64',
                                        '&.Mui-checked': { color: '#892b64' }
                                    }} />} label="" />
                                    <FormControlLabel value="#723c70" control={<Radio sx={{
                                        color: '#723c70',
                                        '&.Mui-checked': { color: '#723c70' }
                                    }} />} label="" />
                                    <FormControlLabel value="#5c4d7d" control={<Radio sx={{
                                        color: '#5c4d7d',
                                        '&.Mui-checked': { color: '#5c4d7d' }
                                    }} />} label="" />
                                    <FormControlLabel value="#455e89" control={<Radio sx={{
                                        color: '#455e89',
                                        '&.Mui-checked': { color: '#455e89' }
                                    }} />} label="" />
                                    <FormControlLabel value="#2e6f95" control={<Radio sx={{
                                        color: '#2e6f95',
                                        '&.Mui-checked': { color: '#2e6f95' }
                                    }} />} label="" />
                                    <FormControlLabel value="#1780a1" control={<Radio sx={{
                                        color: '#1780a1',
                                        '&.Mui-checked': { color: '#1780a1' }
                                    }} />} label="" />
                                    <FormControlLabel value="#0091ad" control={<Radio sx={{
                                        color: '#0091ad',
                                        '&.Mui-checked': { color: '#0091ad' }
                                    }} />} label="" />
                                </RadioGroup>
                            </FormControl>
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
                    </Card>
                </Grid>
            </Box>
        </div>
    )
}

export default EditNote
