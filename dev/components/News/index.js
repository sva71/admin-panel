import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router";
import Alert from 'react-bootstrap/Alert';

import NewsItem from "../NewsItem";
import {updateNavigation, setNews} from "../../actions";

import style from '../Groups/style.sass';
import Navigation from "../Navigation";
import {Spinner} from "react-bootstrap";

const News = (props) => {

    const groupId = +props.match.params.groupId;
    const {_id, name} = useSelector(store => store.groups[groupId - 1]);
    const {authenticated} = useSelector(store => store.settings);
    const {baseURL} = useSelector(store => store.settings);
    const dispatch = useDispatch();
    const history = useHistory();

    let news = useSelector(store => store.news);
    const [loading, setLoading] = useState(false);
    const [newsError, setNewsError] = useState({ isError: false, errorMsg: '' });

    const navigation = [
        {
            name: 'Группы',
            link: '/groups'
        },
        {
            name,
            link: '/groups/'+name
        },
        {
            name: 'Новости',
            link: '/groups/'+groupId+'/news'
        }
    ]

    useEffect(() => {
        dispatch(updateNavigation(navigation));
        setLoading(true);
        fetch(baseURL + `/posts/byGroup/${_id}/?_from=0&_to=99`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.error) {
                    setNewsError({ isError: true, errorMsg: json.error.message })
                } else {
                    news = json.data
                        .sort((a, b) => {
                            if (a._id < b._id) return -1;
                            if (a._id > b._id) return 1;
                            return 0;
                        })
                        .map((item, index) => {
                            return {
                                id: index + 1,
                                groupId,
                                ...item
                            }
                        });
                    dispatch(setNews(news));
                }
            })
            .catch(error => {
                setLoading(false);
                setNewsError({ isError: true, errorMsg: error.toString() })
            });
    }, []);

    if (!authenticated) setTimeout(() => history.push('/'), 3000);

    return (
         authenticated ? (
            <div>
                <Navigation/>
                { loading ? (
                    <div>
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                <div className={style.panel}>
                    <div
                        className={style['big-button']}
                        title="Добавить новость"
                        onClick={() => history.push(`/groups/${groupId}/news/0`)}
                    >
                        +
                    </div>
                    <div className={style.groups}>
                        {
                            news.map((item, index) =>
                                <NewsItem key={index} {...item} />)
                        }
                    </div>
                </div>)}
            </div>) : (
                <Alert variant="danger">У вас недостаточно прав для посещения этой страницы. Авторизуйтесь, пожалуйста!</Alert>
            )
    )

}

export default News;