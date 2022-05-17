import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainView from "../main-view/main-view";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitClick, setSubmitClick] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
        setSubmitClick(true)
    };

    const handleRegister = (e) => {
        e.preventDefault()
        props.onRegister(true)
    }

    if (submitClick) {
        return (
            <MainView></MainView>
        )
    }
    return (
        <form>
            <label>
                username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="submit" onClick={handleRegister}>New Users</button>
        </form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};