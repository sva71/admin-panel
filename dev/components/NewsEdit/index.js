import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {updateGroup, updateNavigation} from '../../actions';

import style from '../GroupEdit/style.sass';
import Navigation from "../Navigation";

const NewsEdit = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const id = +props.match.params.newsId;
    const groupId = +props.match.params.groupId;

    const group = useSelector(store => store.groups[groupId - 1]);
    const {news} = useSelector(store => store.groups[groupId - 1]);
    const newId = news.length ? news[news.length - 1].id + 1 : 1;
    const [newsItem, setNewsItem] = useState(id ?
        news[id - 1] : { id: newId, image: '', body: '' });

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

    const bodyChanged = (e) => {
        setNewsItem({...newsItem, body: e.target.value});
    }

    const saveClicked = () => {
        if (id) {
            dispatch(updateGroup({
                ...group,
                news: news.map((item) => item.id === newsItem.id ? newsItem : item)
            }))
        } else {
            dispatch(updateGroup(({
                ...group,
                news: [...news, newsItem]
            })))
        }
        history.push('/groups/' + groupId + '/news');
    }

    const cancelClicked = () => {
        history.push('/groups/' + groupId + '/news');
    }

    return (
        <>
        <Navigation />
        <div className={style.wrapper}>
            <Form>

                <Form.Group as={Row}>

                    <Form.Label column sm="2" className="mt-3">Фото:</Form.Label>
                    <Col sm="10">
                        <Form.File className="mt-3" accept="image/*"/>
                    </Col>

                    <Form.Label column sm="2" className="mt-3">Текст новости:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            id="news__text"
                            rows="8"
                            className="mt-3"
                            placeholder="Введите текст новости"
                            value={newsItem.body}
                            onChange={bodyChanged}
                        />
                    </Col>

                </Form.Group>

                <hr/>

                <Form.Group>

                    <div className={style.footer}>
                        <div> </div>
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