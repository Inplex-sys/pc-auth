import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import CreatePasswordForm from '../components/CreatePasswordForm';

const { ipcRenderer } = window.require('electron');

const Auth = () => {
    const [containerExist, setContainerExist] = React.useState(false);

    React.useEffect(() => {
        ipcRenderer.send('container-exist', []);

        ipcRenderer.on('container-exist-response', (event, response) => {
            setContainerExist(response.success);
        });
    }, []);

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col>
                    {
                        containerExist ? <LoginForm /> : <CreatePasswordForm />
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Auth;