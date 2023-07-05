import React, { useEffect } from 'react';
import AuthCard from '../components/Manager/AuthCard';
import { Container, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Logo from '../assets/logo.png';

const { ipcRenderer } = window.require('electron');

const Manager = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const [show, setShow] = React.useState(false);
    const [authenticators, setAuthenticators] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getAuthenticators = () => {
            ipcRenderer.send('get-authenticators', []);
        }

        setInterval(getAuthenticators, 1000);
        ipcRenderer.on('get-authenticators-response', (event, response) => {
            setAuthenticators(response);
        })
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const addAuthenticator = async ( data ) => {
        ipcRenderer.send('add-authenticator', {
            'labelname': data.label,
            'user': data.user,
            'password': data.password,
            'secret': data.secret           
        })

        ipcRenderer.on('add-authenticator-response', (event, response) => {
            if (response.success)
                reset()
                handleClose()
        })
        
    }

    // Filter the authenticators based on the search term
    const filteredAuthenticators = authenticators.filter((authenticator) =>
        authenticator.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar expand="lg" className="bg-dark-1 fixed-top shadow">
                <Container>
                    <Navbar.Brand>
                        <img height="32" src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Button className="justify-content-end" variant="success" onClick={handleShow}>
                        Add Authenticator
                    </Button>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Authenticator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(addAuthenticator)}>
                        <Form.Control type="text" {...register("label", { required: true })} placeholder="Label" />
                        {errors.label && <span className="text-danger">This field is required<br /></span>}
                        <small className="text-muted">
                            This is used to identify the authenticator in the manager, if you don't have ideas what to put here you can use the website name.
                        </small>

                        <Form.Control type="text" {...register("user", { required: true })} className="mt-3" placeholder="Email or Username (Used on the website)" />
                        {errors.user && <span className="text-danger">This field is required<br /></span>}
                        <small className="text-muted">
                            This is used to identify the account, it can be useful if you have multiple accounts on the same website.
                        </small>

                        <Form.Control type="text" {...register("password", { required: true })} className="mt-3" placeholder="Enter Password" />
                        {errors.user && <span className="text-danger">This field is required<br /></span>}
                        <small className="text-muted">
                            This is used to identify the account, it can be useful if you have multiple accounts on the same website.
                        </small>                        

                        <Form.Control type="text" {...register("secret", { required: true, minLength:16 })} className="mt-3" placeholder="2FA Secret (TOTP)" />
                        {errors.secret && errors.secret.type === "required" && <span className="text-danger">This field is required<br /></span>}
                        {errors.secret && errors.secret.type === "minLength" && <span className="text-danger">The secret key must be at least 16 characters long<br /></span>}
                        <small className="text-muted">
                            This is the secret key used to generate the OTP code, spaces don't matter. If you only have
                            a QR Code you can use a online QR Code decoder to get the secret key.
                        </small>

                        <Modal.Footer className="mt-3">
                            <Button className="col-5" variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <div className="col-1"></div>
                            <Button className="col-5" variant="primary" type="submit">
                                Add
                            </Button>
                        </Modal.Footer>                           
                    </Form>                 
                </Modal.Body>
            </Modal>
            <div className="m-5 pt-5">
                <div className="row">
                    <div className="col-12 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {filteredAuthenticators.map((authenticator, index) => (
                        <AuthCard
                            user={authenticator.user}
                            password={authenticator.password}
                            label={authenticator.label}
                            code={authenticator.code}
                            uuid={authenticator.uuid}
                        />
                    ))}
                    {authenticators.length === 0 && (
                        <div className="col-12">
                            <div className="card bg-dark-1 shadow mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title text-white">No Authenticators</h5>
                                    <p className="card-text text-white">Click on the button on the top to add a new authenticator.</p>
                                </div>
                            </div>
                        </div>
                    )}                    
                </div>
            </div>
        </>
    );
}

export default Manager;