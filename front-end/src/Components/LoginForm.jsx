import React from 'react';

const LoginForm = props => {
    if( props.formState === true ){
        return(
            <div className="LoginForm">
                <form onSubmit={ props.onLoginSubmit }>
                    <h2 className="form-title">Sign in</h2>
                    <label className="form-label">Username: </label>
                    <input className="form-element" type="text" value={ props.nameValue } onChange={ props.nameChange } /><br/>
                    <label className="form-label">Password: </label>
                    <input className="form-element" type="password" value={ props.passValue } onChange={ props.passChange }/><br/>
                    <input className="submit-btn" type="submit" value="Sign in"/>
                </form>
            </div>
        )
    } else{
        return(
            <div className="LoginForm">
                <form onSubmit={ props.onRegisterSubmit }>
                    <h2 className="form-title">Register</h2>
                    <label className="form-label">Username: </label>
                    <input className="form-element" type="text" value={ props.nameValue } onChange={ props.nameChange } /><br/>
                    <label className="form-label">E-mail: </label>
                    <input className="form-element" type="text" value={ props.mailValue } onChange={ props.mailChange }/><br/>
                    <label className="form-label">Password: </label>
                    <input className="form-element" type="password" value={ props.passValue } onChange={ props.passChange }/><br/>
                    <input className="submit-btn" type="submit" value="Register"/>
                </form>
            </div>
        )
    }
}

export default LoginForm;