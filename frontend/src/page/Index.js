import React from 'react'
import { Row, Container, Navbar, Nav } from 'react-bootstrap';
import { Grid, Button, Box } from '@mui/material';


function Index() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="container-fluid">
                            <Nav.Item className="ms-auto">
                                <Nav.Link href="/login">LOGIN</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link href="/register">SIGN UP</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Grid container>
                <Row>
                    <Box marginTop={20} fontSize={100}>
                        MyNote
                    </Box>
                    <Box marginTop={1} fontSize={40} marginLeft={4}>
                        Write the notes with us.
                    </Box>
                    <Box marginTop={5} marginLeft={-13}>
                    <Button variant="contained"  href="/login" style={{ minWidth: 130, maxWidth: 130, backgroundColor: '#303030', color: 'white' }}>
                        WRITE NOW
                    </Button>
                    </Box>
                </Row>
            </Grid>
        </div>
    )
}

export default Index
