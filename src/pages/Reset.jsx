import React from "react";
import { Container, Row, Button, Col } from 'react-bootstrap';
import Logo from '../assets/logo.png';

const { ipcRenderer } = window.require('electron');

const Reset = () => {
    const resetContainer = async () => {
        ipcRenderer.send('reset-container', []);
        ipcRenderer.on('reset-container-response', (event, response) => {
            if (response.success)
                window.location.href = "#/";
        })
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col>
                    <img className="mx-auto d-block mb-3" src={Logo} alt="Logo" />
                    <p className="text-center text-white mb-3">
                        There is no way to recover your password if you lose it.<br/>
                        You will have to create a new container, this will delete your current one,<br/>
                        and you will lose all your data. Are you sure you want to do this?<br/>
                        If you are not sure, you can go back to the login page by clicking <a href="#/">here</a>.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={resetContainer}>Reset</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Reset;