import React from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Logo from '../assets/logo.png';

const { ipcRenderer } = window.require('electron');

const CreatePasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const submit = async (data) => {
        ipcRenderer.send('register', {'password': data.password})

        ipcRenderer.on('register-response', (event, response) => {
            if (response.success)
                navigate('/manager')
        })
    }


    return (
        <>
            <img className="mx-auto d-block mb-3" src={Logo} alt="Logo" />
            <p className="text-center text-white mb-3">
                Create your password, it will be used to encrypt the<br/>
                secret container that will store OTP secrets. Use a strong<br/>
                password and keep it safe, you will not be able to recover it.
            </p>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Label className="text-white">Create Your Container</Form.Label>
                <Form.Control type="password" {...register("password", { required: true, minLength:8 })} placeholder="Type your password" />
                {errors.password && errors.password.type === "required" && <span className="text-danger">This field is required.</span>}
                {errors.password && errors.password.type === "minLength" && <span className="text-danger">Password must be at least 8 characters long.</span>}
                <Form.Control type="password" {...register("rpassword", { required: true })} className="mt-3" placeholder="Repeat password" />
                {errors.rpassword && <span className="text-danger">This field is required.</span>}                 
                <Button variant="primary" type="submit" className="w-100 mt-3">Create</Button>
            </Form>
        </>
    );
}

export default CreatePasswordForm;