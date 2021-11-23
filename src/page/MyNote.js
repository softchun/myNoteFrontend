import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import NavBar from '../component/Navbar';

const baseURL = "https://my-note-backend.herokuapp.com/";

function MyNote() {

    const navigate = useNavigate();

    const [notes, setNotes] = useState();

    useEffect(() => {
        axios.get(`${baseURL}/note/mynotes`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (response.status === 403){
                    localStorage.removeItem("token");
                }
                setNotes(response.data)
            });
    }, []);

    function handleDelete(id) {

        axios.post(`${baseURL}/note/delete`,
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
                setNotes(
                    notes.map(el => (el._id === id ? { ...el, fav: !el.fav } : el))
                );
            });
    }

    function handleEdit(id) {
        navigate(`/editnote/${id}`);
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
                    My Notes
                </Box>
            </Grid>
            <Grid container marginLeft={0} marginRight={5} justifyContent='center' flex-wrap='wrap'>
                {notes && notes.map((obj) => {

                    const color = obj.color;
                    let isFav = obj.fav;

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
                                    }} style={{ color: isFav ? '#DB6F6F' : 'white' }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete note" onClick={() => handleEdit(obj._id)} style={{ color: 'white' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete note" onClick={() => handleDelete(obj._id)} style={{ color: 'white' }}>
                                        <DeleteIcon />
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

export default MyNote
