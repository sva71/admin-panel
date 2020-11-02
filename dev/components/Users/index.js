import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap';

import style from './style.sass';
import Alert from "react-bootstrap/Alert";

const Users = () => {

    const [user, setUser] = useState(undefined);
    const [changed, setChanged] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');
    const [userError, setUserError] = useState({ isError: false, errorMsg: ''});

    const {baseURL} =
        useSelector(store => store.settings);

    const [loading, setLoading] = useState(false);

    const userChanged = (e) => {
        setUser({...user, role: e.target.value});
        setChanged(true);
    }

    const searchClicked = () => {
        setLoading(true);
        fetch(baseURL + '/users/' + searchEmail, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.error) {
                    setUserError({ isError: true, errorMsg: json.error.message })
                } else {
                    setUser(json.data);
                    setSearchEmail('');
                }
            })
            .catch(error => {
                setLoading(false);
                setUserError({ isError: true, errorMsg: error.toString() })
            })
    }

    const saveClicked = () => {
        setLoading(true);
        fetch(baseURL + '/users/' + user.ID + '?_role=' + user.role, {
            method: 'PATCH',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.error) {
                    setUserError({ isError: true, errorMsg: json.error.message })
                } else {
                    setUser(undefined);
                    setChanged(false);
                }
            })
    }

    return (
        <div className={style.users}>

            { loading ? (
                <div className={style.spinner}>
                    <Spinner animation="border" role="status" />
                </div>
                ) : (

            <Container>

                { userError.isError ? (
                    <Alert variant="danger">Ошибка поиска: {userError.errorMsg}</Alert>
                ) : (<></>) }

                <Form>

                    <Form.Label>E-mail пользователя:</Form.Label>
                    <Form.Control
                        type="email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <Button
                        variant="success"
                        className="mt-3"
                        onClick={searchClicked}
                    >
                        Найти
                    </Button>


                {
                    user ? (
                        <Row className={style['user-item']}>
                            <Col>{user.name}</Col>
                            <Col>{user.email}</Col>
                            <Col>
                                <Form.Control as="select" value={user.role}
                                    onChange={userChanged}>
                                    <option>administrator</option>
                                    <option>user</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    ) : (<></>)
                }

                </Form>


                {user ? (<Button variant="primary"
                    className={style['save-button'] + ' mt-3'}
                    disabled={!changed}
                    onClick={saveClicked}
                >
                    Сохранить
                </Button>) : (<></>)}

            </Container>)}

        </div>
    )
}

export default Users;