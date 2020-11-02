import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import {setAuthenticated} from '../../actions';

import style from './style.sass'

const Auth = () => {

    const {baseURL} = useSelector(store => store.settings);
    const dispatch = useDispatch();
    const {rootPath} = useSelector(store => store.settings);
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState({ isError: false, errorMsg: ''});

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const doLogin = () => {
        // dispatch(setAuthenticated(true));
        // history.push('/groups');
        setLoading(true);
        const request = fetch(baseURL+'/users/authentication/email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ email, password, device: {
                name: 'PC'} })
        });

        request
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.error) {
                    setAuthError({ isError: true, errorMsg: json.error.message })
                } else {
                    dispatch(setAuthenticated(true));
                    history.push('/groups');
                }
            })
            .catch(error => {
                setLoading(false);
                setAuthError({ isError: true, errorMsg: error.toString() })
            })

    }

    return (
        <div className={style.wrapper}>

            { authError.isError ? (
                <Alert variant="danger">Ошибка авторизации: {authError.errorMsg}</Alert>
            ) : <></> }

            <Form>
                <Form.Group>

                    <Form.Label className="mt-3">Электронная почта:</Form.Label>
                    <Form.Control
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={changeEmail}
                        placeholder="Электронная почта"
                    />

                    <Form.Label className="mt-3">Пароль:</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={changePassword}
                        placeholder="Пароль"
                    />

                    <div className={style.footer}>
                        {loading ?
                        (<Spinner animation="border" role="status" />) :
                        (<Button
                            variant="primary"
                            className="mt-3"
                            onClick={doLogin}
                        >
                            Войти
                        </Button>)}
                    </div>

                </Form.Group>
            </Form>
        </div>
    )
}

export default Auth;