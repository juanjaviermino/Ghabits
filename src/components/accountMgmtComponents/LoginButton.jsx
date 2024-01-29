import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loggin, saveData } from '../../context/userSlice';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function LoginButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`);
                const userData = {
                    email: userInfoResponse.data.email,
                    givenName: userInfoResponse.data.given_name,
                    familyName: userInfoResponse.data.family_name,
                    imageUrl: userInfoResponse.data.picture
                };
                // You may want to send the token to your server to validate it and create a session
                const response = await axios.post(`${serverUrl}/add_user`, userData);
                console.log('Respuesta del servidor: ', response);
                // Dispatch Redux actions as necessary
                dispatch(saveData({ userData: {...userData, userId: response.data.userId} }));
                dispatch(loggin());
                // Navigate to your desired route after login
                navigate('/Ghabits/');
            } catch (error) {
                console.error('Error during user creation or fetching:', error);
            }
        },
        onError: errorResponse => {
            console.log('Login failed:', errorResponse);
        },
    });

    const buttonStyle = {
        border: '0px solid',
        fontFamily: 'poppins',
        background: '#936b32',
        backgroundSize: '400% 400%',
        color: 'white',
        display: 'flex',
        gap:'10px',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }

    return (
        <button style={buttonStyle} onClick={() => login()} className="login-button">
            <i className="pi pi-google" style={{fontSize:'12px', color:'white'}}></i>
            Iniciar sesión
        </button>
    );
}

export default LoginButton;
