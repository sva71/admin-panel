import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {updateNavigation} from '../../actions';

import style from '../GroupEdit/style.sass';
import Navigation from "../Navigation";

const NewsEdit = (props) => {

    const history = useHistory();
    const {baseURL} = useSelector(store => store.settings);
    const dispatch = useDispatch();

    const id = +props.match.params.newsId;
    const groupId = +props.match.params.groupId;

    const group = useSelector(store => store.groups[groupId - 1]);
    let [newsItem, setNewsItem] = useState(id? useSelector(store => store.news[id - 1]) :
        {
            id: '', titleID: '', content: '', total: {likes: 0, views: 0}, _createdAt: 0, updatedAt: 0,
            group: {_id: group._id, name: group.name, avatarID: group.avatar}, isLiked: false, isBookmarked: false
        });

    newsItem.groupID = group._id;

    const navigation = [
        {
            name: 'Группы',
            link: '/groups'
        },
        {
            name: group.name,
            link: '/groups/' + groupId
        },
        {
            name: 'Новости',
            link: '/groups/' + groupId + '/news'
        },
        {
            name: id ? '#' + id : 'Новая новость',
            link: '/groups/' + groupId + '/news/' + id
        }
    ];

    useEffect(() => {dispatch(updateNavigation(navigation))}, []);

    const contentChanged = (e) => {
        setNewsItem({...newsItem, content: e.target.value});
    }

    const saveClicked = () => {

        const itemToSave = JSON.parse(JSON.stringify(newsItem));

        const titleFile = document.getElementById('title-file');
        const titleData = new FormData();
        titleFile.files.length && titleData.append('file', titleFile.files[0]);
        const titlePromise = () => fetch(baseURL + '/s/files/', {
            method: 'POST',
            credentials: 'include',
            body: titleData
        })
            .then(response => response.json())

        let savePromise;
        if (id) {
            savePromise = () => fetch(baseURL + '/posts/' + newsItem._id + '/', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(itemToSave)
            })
                .then(response => response.json());
        } else {
            savePromise = () => fetch(baseURL + '/posts/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf8'
                },
                body: JSON.stringify(itemToSave)
            })
                .then(response => response.json());
        }

        titleFile.files.length ? titlePromise().then(json => {
            itemToSave.titleID = json.data._id;
            savePromise().then(() => history.push('/groups/' + groupId + '/news'))
        }) : savePromise().then(() => history.push('/groups/' + groupId + '/news'))

    }

    const cancelClicked = () => {
        history.push('/groups/' + groupId + '/news');
    }

    const insertFile = () => {
        const imageFile = document.getElementById('image-file');
        const textArea = document.getElementById('news__text');
        if (imageFile.files.length) {
            const imageData = new FormData();
            imageData.append('file', imageFile.files[0]);
            fetch(baseURL + '/s/files/', {
                method: 'POST',
                credentials: 'include',
                body: imageData
            })
                .then(response => response.json())
                .then(json => {
                    textArea.value += `![image](<storageURL>/${json.data._id})`;
                    setNewsItem({...newsItem, content: textArea.value});
                    imageFile.value=""
                })
        }
    }

    return (
        <>
        <Navigation />
        <div className={style.wrapper}>
            <Form>

                <Form.Group as={Row}>

                    <Form.Label column sm="2" className="mt-3">Фото:</Form.Label>
                    <Col sm="10">
                        <Form.File id="title-file" className="mt-3" accept="image/*"/>
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Текст новости:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            id="news__text"
                            rows="8"
                            className="mt-3"
                            placeholder="Введите текст новости"
                            value={newsItem.content}
                            onChange={contentChanged}
                        />
                    </Col>
                    <Form.Label column sm="2" className="mt-3">Вставить картинку:</Form.Label>
                    <Col sm="10">
                        <Form.File id="image-file" className="mt-3" accept="image/*"
                                   onChange={insertFile} />
                    </Col>

                </Form.Group>

                <hr/>

                <Form.Group>

                    <div className={style.footer}>
                        <div></div>
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

export default NewsEdit;