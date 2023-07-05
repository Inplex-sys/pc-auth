import React, { useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const { ipcRenderer } = window.require('electron');

const LoginForm = () => {
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        ipcRenderer.send('auth', {'password': password})

        ipcRenderer.on('auth-response', (event, response) => {
            if (response.success)
                navigate('/manager');
            else
                document.querySelector("small.text-danger").innerHTML = "Incorrect password";
        })
    }

    useEffect(() => {
        if (password.length > 0){
            document.querySelector("small.text-danger").innerHTML = "";
            document.querySelector("small.text-primary").innerHTML = "press ENTER to unlock your ciphered container";
        }else
            document.querySelector("small.text-primary").innerHTML = "";
    }, [password]);

    return (
        <>
            <img className="mx-auto d-block mb-3" src={Logo} alt="Logo" />
            <p className="text-center text-white mb-3">
                Your passphrase is used to decrypt your private key.<br/>
                It is not stored anywhere and is not sent to any server.
            </p>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="password" placeholder="Type your password" value={password} onChange={e => setPassword(e.target.value)} />
                <small className="text-white text-center text-primary"></small><br/>
                <small className="text-white text-center text-danger"></small>
            </Form>
            <p className="text-white">You forgot your password? Reset your container <a href="#/reset">here</a>.</p>
        </>
    );
}

export default LoginForm;