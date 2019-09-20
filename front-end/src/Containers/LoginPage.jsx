import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import LoginForm from '../Components/LoginForm';

const LoginPage = (props) => {    
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ formState, setFormState ] = useState(true);

    useEffect( ()=>{
        if( localStorage.getItem('auth-token') ){
            const decodedJWT = jwt_decode(localStorage.getItem('auth-token'));
            if( decodedJWT._id === localStorage.getItem('id') ){
                console.log('You already signed in, redirecting')
                return props.history.push('/login');
            }
        }
        // eslint-disable-next-line
    }, [])

    const onUsernameChange = event => {
        setUsername( event.target.value );
        setErrorMsg('');
    }

    const onEmailChange = event => {
        setEmail( event.target.value );
        setErrorMsg('');
    }

    const onPasswordChange = event => {
        setPassword(event.target.value);
        setErrorMsg('');
    }

    const onLoginSubmit = event => {
        event.preventDefault();
        const request = { username: username, password: password  }
        axios.post('http://localhost:7600/login/login', request)
            .then( res => {
                if( res.status === 200 ){
                    localStorage.setItem('auth-token', res.data);
                    const decodedJWT = jwt_decode(localStorage.getItem('auth-token'));
                    localStorage.setItem('id', decodedJWT._id);
                    props.history.push('/');
                } 
            })
            .catch( err => {
                if( err.res ){
                    console.log(err.res);
                } else if( err.request ){
                    console.log( err.request.response );
                    setErrorMsg( err.request.response );
                } else{
                    console.log('Error: ' + err);
                }
            })
    }

    const onRegisterSubmit = event => {
        event.preventDefault();
        const request = { username: username, email: email, password: password };
        axios.post('http://localhost:7600/login/register', request)
            .then( res => {
                if( res.status === 200 ){
                    setErrorMsg('New User Added');
                    setFormState(true);
                    setUsername('');
                    setPassword('');
                }
            })
            .catch( err  => {
                if( err.res ){
                    console.log(err.res);
                } else if( err.request ){
                    console.log( err.request.response );
                    setErrorMsg( err.request.response );
                } else{
                    console.log('Error: ' + err);
                }
            })
    }

    return(
        <div className="LoginPage">
            <h2>Please sign in</h2>
            <p>to access this website</p>
            <LoginForm formState = { formState }
                onLoginSubmit = { onLoginSubmit }
                onRegisterSubmit = { onRegisterSubmit }
                nameValue = { username }
                nameChange = { onUsernameChange }
                mailValue = { email }
                mailChange = { onEmailChange }
                passValue = { password }
                passChange = { onPasswordChange }
            />
            <p>{ errorMsg }</p>
            <div form-btns>
                <input type="button" value="Sign in" onClick={ ()=>{ setFormState( true )}}/>
                <input type="button" value="register" onClick={ ()=>{ setFormState( false )}}/>
            </div>
        </div>
    )
}

export default LoginPage;