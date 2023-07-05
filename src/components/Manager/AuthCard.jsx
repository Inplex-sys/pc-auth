import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import TrashLogo from '../../assets/trash.svg'

const { ipcRenderer } = window.require('electron');

class AuthCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        this.code = React.createRef();
        this.show = React.createRef();
    }
    
    copyToClipboard = (e) => {
        const textField = document.createElement('textarea')
        textField.innerText = e.target.innerText
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    
    getAuthenticator = async () => {
        ipcRenderer.send('get-authenticator', {
            'uuid': this.props.uuid
        });
        
        ipcRenderer.on('get-authenticator-response', (event, response) => {
            if (response.success) {
                ipcRenderer.removeAllListeners('get-authenticator-response');

                this.code.current.innerText = response.code;
                
                this.show.current.disabled = true;
                this.show.current.innerText = 10;
    
                this.code.current.onclick = this.copyToClipboard;
                this.code.current.classList.add('copy-animation');
    
                const progress = setInterval(() => {
                    const now = this.show.current.innerText;
                    const next = now - 1;
                    this.show.current.innerText = next;
    
                    if (next === 0) {
                        clearInterval(progress);
                        this.code.current.innerText = '- - - -';
                        this.show.current.innerText = 'Show';
                        this.show.current.disabled = false;
    
                        this.code.current.onclick = null;
                        this.code.current.classList.remove('copy-animation');
                    }
                }, 1000);
            }
        });
    }

    deleteAuthenticator = () => {
        ipcRenderer.send('delete-authenticator', {
            'uuid': this.props.uuid
        });
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Authenticator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to add this authenticator?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                        <Button variant="danger" onClick={this.deleteAuthenticator}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="card bg-dark-1 shadow mb-3">
                    <div className="card-body text-center">
                        <Row>
                            <Col xs={9}>
                                <p className="text-white shadow-lg bg-dark-2 rounded p-2"><b>{this.props.label}</b></p>
                            </Col>
                            <Col xs={3}>
                                <Button className="btn-danger col-12" variant="primary" onClick={this.handleShow}><img height="24" src={TrashLogo} alt="delete" /></Button> 
                            </Col>
                        </Row>   
                        <Row>
                            <Col xs={4}>
                                <Button variant="primary" className="col-12" ref={this.show} onClick={this.getAuthenticator}>Show</Button>
                            </Col>
                            <Col xs={8}>
                                <p className="text-white shadow-lg bg-dark-2 rounded p-2"><b ref={this.code}>- - - -</b></p>
                            </Col>                            
                        </Row>
                        <p className="text-white shadow-lg col bg-dark-2 rounded p-2">
                            <span className="copy-animation text-decoration-underline" onClick={e => this.copyToClipboard(e)}>{this.props.user}</span>
                        </p>
                        <p className="text-white shadow-lg col bg-dark-2 rounded p-2">
                            <span className="copy-animation blurry-text" onClick={e => this.copyToClipboard(e)}>{this.props.password}</span>
                        </p>                         
                    </div>
                </div> 
            </>
        )
    }
}

export default AuthCard;