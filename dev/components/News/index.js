import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router";

import NewsItem from "../NewsItem";
import {updateNavigation} from "../../actions";

import style from '../Groups/style.sass';
import Navigation from "../Navigation";

const News = (props) => {

    const groupId = +props.match.params.groupId;
    const {news, name} = useSelector(store => store.groups[groupId - 1]);
    const dispatch = useDispatch();
    const history = useHistory();

    const navigation = [
        {
            name: 'Группы',
            link: '/groups'
        },
        {
            name,
            link: '/groups/'+groupId
        },
        {
            name: 'Новости',
            link: '/groups/'+groupId+'/news'
        }
    ]

    useEffect(() => {dispatch(updateNavigation(navigation))}, []);

    return (
        <>
        <Navigation />
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
                        <NewsItem key={index} id={item.id} image={item.image} body={item.body} gId={groupId} />)
                }
            </div>
        </div>
        </>
    )

}

export default News;