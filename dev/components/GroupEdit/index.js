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

    const {baseURL} = useSelector(store => store.settings);
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

    const transformGroup = (groupUpdated) => {
        return {
            _id: groupUpdated._id,
            name: groupUpdated.name,
            coverID: groupUpdated.cover,
            avatarID: groupUpdated.avatar,
            description: groupUpdated.description,
            site: groupUpdated.link,
            total: {
                likes: groupUpdated.likesTotal,
                posts: groupUpdated.newsTotal
            }
        }
    }

    const saveClicked = () => {

        let groupToSave = JSON.parse(JSON.stringify(group));

        const coverFile = document.getElementById('cover-file');
        const avatarFile = document.getElementById('avatar-file');

        const coverData = new FormData();
        const avatarData = new FormData();

        coverFile.files.length && coverData.append('file', coverFile.files[0]);
        avatarFile.files.length && avatarData.append('file', avatarFile.files[0]);

        let savePromise, postFunction;
        if (id) {
            savePromise = () => fetch(baseURL + '/groups/' + groupToSave._id + '/', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(transformGroup(groupToSave))
            })
                .then(response => response.json());
            postFunction = () => dispatch(updateGroup(groupToSave));
        } else {
            savePromise = () => fetch(baseURL + '/groups/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(transformGroup(groupToSave))
            })
                .then(response => response.json());
            postFunction = () => dispatch(addGroup({...groupToSave, id: newId}));
        }

        const coverPromise = () => coverFile.files.length ? fetch(baseURL + '/s/files/', {
            method: 'POST',
            credentials: 'include',
            body: coverData
        })
            .then(response => response.json()) : null;
        
        const avatarPromise = () => avatarFile.files.length ? fetch(baseURL + '/s/files/', {
            method: 'POST',
            credentials: 'include',
            body: avatarData
        })
            .then(response => response.json()) : null;

        Promise.all([coverPromise(), avatarPromise()])
            .then(jsons => {
                if (jsons[0]) jsons[0].error || (groupToSave.cover = jsons[0].data._id);
                if (jsons[1]) jsons[1].error || (groupToSave.avatar = jsons[1].data._id);
                savePromise().then(() => {
                    postFunction();
                    history.push('/groups');
                })
            })

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