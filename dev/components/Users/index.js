import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap';
import {updateUsers} from '../../actions';

import style from './style.sass';

const Users = () => {

    const [users, setUsers] = useState(useSelector(store => store.users));
    const [changed, setChanged] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');

    const {baseURL} = useSelector(store => store.settings);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const userChanged = (e, changedItem) => {
        changedItem.role=e.target.value;
        setUsers(users.map((item) => item.id === changedItem.id ? changedItem : item));
        setChanged(true);
    }

    const searchClicked = () => {
        fetch(baseURL + '/users/' + searchEmail, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }

    const saveClicked = () => {
        dispatch(updateUsers(users));
        setChanged(false);
    }

    return (
        <div className={style.users}>

            { loading ? (
                <div className={style.spinner}>
                    <Spinner animation="border" role="status" />
                </div>
                ) : (

            <Container>
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
                    users.map((item, index) => (
                        <Row className={style['user-item']} key={index}>
                            <Col>{item.name}</Col>
                            <Col>{item.email}</Col>
                            <Col>
                                <Form.Control as="select" value={item.role}
                                              onChange={(e, changedItem) =>
                                                  userChanged(e, item)}>
                                    <option>administrator</option>
                                    <option>user</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    ))
                }

                </Form>


                {users.length ? (<Button variant="primary"
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