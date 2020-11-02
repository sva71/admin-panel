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
import Navigation from "../Navigation";

const GroupEdit = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const id = +props.match.params.groupId;
    const newId = id || useNewId();

    const baseURL = useSelector(store => store.settings);
    const [group, setGroup] = useState(id ?
        useSelector(store => store.groups)[id - 1] :
        { id, cover: '', name: '', avatar: '', description: '', link: '', news: []});

    const navigation = [
        {
            name: 'Группы',
            link: '/groups'
        },
        {
            name: id ? group.name : 'Новая группа',
            link: '/groups/' + id
        }
    ]

    useEffect(() => {dispatch(updateNavigation(navigation))}, []);

    const transformGroup = (group) => {
        return {
            _id: group._id,
            name: group.name,
            coverID: group.cover,
            avatarID: group.avatar,
            description: group.description,
            site: group.link,
            total: {
                likes: group.likesTotal,
                posts: group.newsTotal
            }
        }
    }

    const doSave = () => {
        if (id) {
            fetch(baseURL + '/groups/' + group._id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(transformGroup(group))
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    dispatch(updateGroup({...group, cover: json.data.ID}))
                })
        } else {
            fetch(baseURL + '/groups/', {
                method: 'POST',
                credentials: 'include',
                headers: 'Content-Type: application/json',
                body: JSON.stringify(transformGroup(group))
            })
                .then(response => response.json())
                .then(() => {
                    dispatch(addGroup({...group, id: newId}))
                })
        }
        history.push('/groups');
    }

    const saveClicked = () => {

        const coverFile = document.getElementById('cover-file');
        if (coverFile.files.length) {
            let data = new FormData();
            data.append('file', coverFile.files[0]);
            fetch(baseURL + '/s/files', {
                method: 'POST',
                credentials: 'include',
                headers: 'Content-Type: multipart/form-data',
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    setGroup({...group, cover: json.data.ID});
                })
        }

        const avatarFile = document.getElementById('avatar-file');
        if (avatarFile.files.length) {
            let data = new FormData();
            data.append('file', avatarFile.files[0]);
            fetch(baseURL + '/s/files', {
                method: 'POST',
                credentials: 'include',
                headers: 'Content-Type: multipart/form-data',
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    setGroup({...group, avatar: json.data.ID});
                })
        }

        doSave();

    }

    const cancelClicked = () => {
        history.push('/groups');
    }

    const valueChanged = (e) => {
        setGroup({...group, [e.target.id]: e.target.value});
    }

    return (
        <>
        <Navigation />
        <div className={style.wrapper}>

            <Form>

                <Form.Group as={Row}>

                    <Form.Label column sm="2" className="mt-3">Обложка:</Form.Label>
                    <Col sm="10">
                        <Form.File className="mt-3" id="cover-file" accept="image/*" />
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
                        <Form.File className="mt-3" id="avatar-file" accept="image/*"/>
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
        </>
    )

}

export default GroupEdit;