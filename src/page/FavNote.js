import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import NavBar from '../component/Navbar';

const baseURL = "https://my-note-backend.herokuapp.com";

function FavNote() {

    const [notes, setNotes] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseURL}/note/favlist`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (response.status === 403){
                    localStorage.removeItem("token");
                }
                setNotes(response.data);
            });
    }, []);

    function handleAddFav(id) {

        axios.post(`${baseURL}/note/addfav`,
            {
                _id: id
            }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (response.status === 403){
                    localStorage.removeItem("token");
                    navigate('/login');
                }
                window.location.reload(false);
            });
    }

    function NewlineText(props) {
        const text = props.text;
        return text.split('\n').map(str => <Box>{str}</Box>);
    }

    return (
        <div>
            <NavBar />
            <Grid container justifyContent='center' marginTop={5} marginBottom={5}>
                <Box fontSize={40} fontWeight={700}>
                    My Favorite Notes
                </Box>
            </Grid>
            <Grid container marginLeft={0} marginRight={5} justifyContent='center' flex-wrap='wrap'>
                {notes && notes.map((obj) => {

                    const color = obj.color;

                    return (
                        <Grid padding={2} marginLeft={5} marginRight={5}>
                            <Card sx={{ width: 300, backgroundColor: color, color: 'white' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                                        {obj.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>
                                        writed by {obj.username}
                                    </Typography>
                                    <Box>
                                        <Typography sx={{ fontSize: 18, fontWeight: 700 }} marginTop={3} marginBottom={3}>
                                            <NewlineText text={obj.content} />
                                        </Typography>
                                    </Box>
                                    <Box marginTop={2} marginBottom={-2}>
                                        <Typography sx={{ fontSize: 12 }} marginBottom={-3} gutterBottom>
                                            created at: {(obj.createdAt).split('T')[0]} | updated at: {(obj.updatedAt).split('T')[0]}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="add to favorites" onClick={() => {
                                        handleAddFav(obj._id);
                                    }} style={{ color: '#DB6F6F' }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}

export default FavNote
