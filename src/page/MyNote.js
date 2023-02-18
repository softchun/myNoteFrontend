import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfiniteScroll from "react-infinite-scroll-component";
import './NoteStyle.css'

import NavBar from '../component/Navbar';

const baseURL = process.env.REACT_APP_BACKEND_URL;

function MyNote() {

    const navigate = useNavigate();

    const [notes, setNotes] = useState();
    const [lenNotes, setLenNotes] = useState(1);

    const numPerLoad = 6;
    const [count, setCount] = useState(numPerLoad);

    const [state, setState] = useState({
        items: null,
        hasMore: true
    });

    useEffect(() => {
        axios.get(`${baseURL}/note/mynotes`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (response.status === 403) {
                    localStorage.removeItem("token");
                }
                new Promise(() => {
                    setNotes(response.data)
                }).then(
                    setLenNotes(response.data.length)
                ).then(
                    setState({
                        items: response.data.slice(0, Math.min(numPerLoad, response.data.length)),
                        hasMore: (response.data.length > numPerLoad)
                    })
                )
            });
    }, []);

    function fetchMoreData() {
        if (count >= lenNotes) {
            setState({
                ...state,
                hasMore: false
            });
            return;
        } else {
            setTimeout(() => {
                setState({
                    ...state,
                    items: state.items.concat(notes.slice(count, Math.min(count + numPerLoad, lenNotes)))
                })
            }, lenNotes);
            setCount(count + numPerLoad)
        }
    };

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
                if (response.status === 403) {
                    localStorage.removeItem("token");
                    navigate('/login');
                }
                window.location.reload(false);
            });
    }

    function handleAddFav(id) {

        setState({
            ...state,
            items: state.items.map(el => (el._id === id ? { ...el, fav: !el.fav } : el))
        });

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
                if (response.status === 403) {
                    localStorage.removeItem("token");
                    navigate('/login');
                }
            })
            .catch((error) => {
                setState({
                    ...state,
                    items: state.items.map(el => (el._id === id ? { ...el, fav: !el.fav } : el))
                });
            })
    }

    function handleEdit(id) {
        navigate(`/editnote/${id}`);
    }

    function NewlineText(props) {
        const text = props.text;
        return text.split('\n').map((str, i) => <Box key={props.id.concat(`${i}`)}>{str}</Box>);
    }

    const [open, setOpen] = useState(false);
    const [dialogId, setDialogId] = useState('xxx');

    function handleClickOpen(id) {
        setOpen(true);
        setDialogId(id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <NavBar />
            <Grid container justifyContent='center' marginTop={5} marginBottom={5}>
                <Box fontSize={40} fontWeight={700}>
                    My Notes
                </Box>
            </Grid>
            {state.items && lenNotes ? <InfiniteScroll
                dataLength={state.items.length}
                next={fetchMoreData}
                hasMore={state.hasMore}
                loader={<Box style={{ marginTop: 20 }}><h4>Loading...</h4></Box>}
                endMessage={
                    <Box style={{ textAlign: "center", margin: 40 }}>
                        <h4>You have seen all notes.</h4>
                    </Box>
                }
            >
                <Grid container marginLeft={0} marginRight={5} justifyContent='center' flex-wrap='wrap'>
                    {state.items && state.items.map((obj) => {

                        const color = obj.color;
                        let isFav = obj.fav;

                        return (
                            <Grid padding={2} marginLeft={5} marginRight={5} key={obj._id.concat("mynote")}>
                                <Card sx={{ width: 310, backgroundColor: color, color: 'white' }}>
                                    <CardContent>
                                        <Box sx={{ fontSize: 24, fontWeight: 700 }}>
                                            <a href={`/viewnote/${obj._id}`} className="box-view" title='View Note'>{obj.title}</a>
                                        </Box>
                                        <Box sx={{ mb: 1.5 }}>
                                            writed by {obj.username}
                                        </Box>
                                        <Box>
                                            <Box className="box-content" sx={{ fontSize: 18, fontWeight: 700 }} marginTop={3} marginBottom={3}>
                                                <NewlineText text={obj.content} id={obj._id.concat("mynote_newline")} />
                                            </Box>
                                        </Box>
                                        <Box marginTop={2} marginBottom={-2}>
                                            <Box sx={{ fontSize: 12 }} marginBottom={-3} gutterBottom>
                                                created at: {(obj.createdAt).split('T')[0]} | updated at: {(obj.updatedAt).split('T')[0]}
                                            </Box>
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
                                        <IconButton aria-label="delete note" onClick={() => handleClickOpen(obj._id)} style={{ color: 'white' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        { obj._id === dialogId && <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Delete Note"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to delete this note?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => handleDelete(obj._id)} autoFocus>YES</Button>
                                                <Button onClick={handleClose}>NO</Button>
                                            </DialogActions>
                                        </Dialog> }
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </InfiniteScroll> : ( lenNotes ? <Box style={{ marginTop: 20 }}><h4>Loading...</h4></Box>:<Box style={{ marginTop: 20 }}><h4>You don't have any notes.</h4></Box>)}
        </div>
    )
}

export default MyNote
