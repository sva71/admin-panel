import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap';
import {updateUsers} from '../../actions';
import axios from 'axios';

import style from './style.sass';

const Users = () => {

    const [users, setUsers] = useState(useSelector(store => store.users));
    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => response.data)
            .then(data => data.map((item) => {return {...item, role: 'user'}}))
            .then(data => {
                setLoading(false);
                setUsers(data);
                dispatch(updateUsers(data));
            })
    }, []);

    const userChanged = (e, changedItem) => {
        changedItem.role=e.target.value;
        setUsers(users.map((item) => item.id === changedItem.id ? changedItem : item));
        setChanged(true);
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

                <Button variant="primary"
                        className={style['save-button']}
                        disabled={!changed}
                        onClick={saveClicked}
                >
                    Сохранить
                </Button>

                </Form>
            </Container> )}


        </div>
    )
}

export default Users;