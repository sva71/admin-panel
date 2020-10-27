import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {addGroup, updateGroup, updateNavigation} from "../../actions";
import useNewId from "../../hooks/useNewId";

import style from './style.sass';

const GroupEdit = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = +props.match.params.groupId;
    const newId = id || useNewId();

    const [group, setGroup] = useState(id ?
        useSelector(store => store.groups)[id - 1] :
        { id, cover: '', name: '', avatar: '', description: '', link: '', news: []});

    const navigation = [
        {
            name: 'Группы',
            link: '/#'
        },
        {
            name: id ? group.name : 'Новая группа',
            link: '/#/groups/' + id
        }
    ]

    useEffect(() => {dispatch(updateNavigation(navigation))}, []);

    const saveClicked = () => {
        id ? dispatch(updateGroup(group)) : dispatch(addGroup({...group, id: newId}));
        history.push('/');
    }

    const cancelClicked = () => {
        history.push('/');
    }

    const valueChanged = (e) => {
        setGroup({...group, [e.target.id]: e.target.value});
    }

    return (
        <div className={style.wrapper}>
            <Form>

                <Form.Group as={Row}>

                    <Form.Label column sm="2" className="mt-3">Обложка:</Form.Label>
                    <Col sm="10">
                        <Form.File className="mt-3" accept="image/*" />
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Имя группы:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            id="name"
                            type="text"
                            required
                            className="mt-3"
                            placeholder="Введите имя группы"
                            value={group.name}
                            onChange={valueChanged}
                        />
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Аватар:</Form.Label>
                    <Col sm="10">
                        <Form.File className="mt-3" accept="image/*"/>
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Описание:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            id="description"
                            type="text"
                            className="mt-3"
                            placeholder="Введите описание группы"
                            value={group.description}
                            onChange={valueChanged}
                        />
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Сайт:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            id="link"
                            type="text"
                            className="mt-3"
                            placeholder="Ссылка на сайт группы"
                            value={group.link}
                            onChange={valueChanged}
                        />
                    </Col>

                </Form.Group>

                <hr/>

                <Form.Group>
                    <div className={style.footer}>
                        { id ?
                        (<Button variant="success" onClick={() => history.push(`/groups/${id}/news`)}>
                            К новостям группы...
                        </Button>) : (<div> </div>) }
                        <div>
                            <Button variant="primary" className="mr-1" onClick={saveClicked}>Сохранить</Button>
                            <Button variant="secondary" onClick={cancelClicked}>Отменить</Button>
                        </div>
                    </div>
                </Form.Group>

            </Form>
        </div>
    )

}

export default GroupEdit;