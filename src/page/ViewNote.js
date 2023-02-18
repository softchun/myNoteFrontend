import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './NoteStyle.css'

import NavBar from '../component/Navbar';

const baseURL = process.env.REACT_APP_BACKEND_URL;

function ViewNote() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState()

    useEffect(() => {

        function FetchProduct() {

            axios.post(`${baseURL}/note/view`,
                {
                    _id: id
                }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then((res) => {
                    if (res.status === 403) {
                        localStorage.removeItem("token");
                    }
                    setData(res.data)
                });
        }

        FetchProduct()

    }, [id]);

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

        setData({
            ...data,
            fav: !data.fav
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
                setData({
                    ...data,
                    fav: !data.fav
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
        <div bgcolor='#212529'>
            <NavBar />
            <Box bgcolor='#212529' style={{ minHeight: '92.5vh' }}>
                {data && <Grid container direction="column" alignItems="center" justify="center">
                    <Card sx={{ maxWidth: 800, minHeight: 500, backgroundColor: data.color, margin: 10, padding: 5, paddingBottom: 6 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '75ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            color='white'
                        >
                            <CardContent>
                                <Box className="box-content-view" fontSize={40} fontWeight={700} marginTop={2} >
                                    {data.title}
                                </Box>
                                <Box sx={{ fontSize: 18, marginTop: 2, marginBottom: 4 }}>
                                    writed by {data.username}
                                </Box>
                                <Box>
                                    <Box className="box-content-view" sx={{ fontSize: 22, fontWeight: 700 }} marginTop={5} marginBottom={5}>
                                        <NewlineText text={data.content} id={data._id.concat("mynote_newline")} />
                                    </Box>
                                </Box>
                                <Box marginTop={3}>
                                    <Box sx={{ fontSize: 16 }} gutterBottom>
                                        created at: {(data.createdAt).split('T')[0]} | updated at: {(data.updatedAt).split('T')[0]}
                                    </Box>
                                    <Box sx={{ fontSize: 16 }} gutterBottom>
                                        privacy: {data.privacy}
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="add to favorites" onClick={() => {
                                    handleAddFav(data._id);
                                }} style={{ color: data.fav ? '#DB6F6F' : 'white' }}>
                                    <FavoriteIcon />
                                    {data.fav ? <Box sx={{ fontSize: 20 }}>&nbsp;Remove favorites</Box> : <Box sx={{ fontSize: 20 }}>&nbsp;Add to favorites</Box>}
                                </IconButton><br />
                                {(data.username === data.note_username) && <><IconButton aria-label="delete note" onClick={() => handleEdit(data._id)} style={{ color: 'white' }}>
                                    <EditIcon />
                                    <Box sx={{ fontSize: 20 }}>&nbsp;Edit Note</Box>
                                </IconButton>
                                    <IconButton aria-label="delete note" onClick={() => handleClickOpen(data._id)} style={{ color: 'white' }}>
                                        <DeleteIcon />
                                        <Box sx={{ fontSize: 20 }}>&nbsp;Delete Note</Box>
                                    </IconButton>
                                    {data._id === dialogId && <Dialog
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
                                            <Button onClick={() => handleDelete(data._id)} autoFocus>YES</Button>
                                            <Button onClick={handleClose}>NO</Button>
                                        </DialogActions>
                                    </Dialog>}</>}
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>}
            </Box>
        </div>
    )
}

export default ViewNote
