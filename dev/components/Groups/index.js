import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router";
import Alert from 'react-bootstrap/Alert';

import GroupItem from '../GroupItem';
import Title from "../Title";
import Users from '../Users';
import Navigation from "../Navigation";
import {setGroups} from '../../actions';

import style from './style.sass';
import {updateNavigation} from "../../actions";
import {Spinner} from "react-bootstrap";

const Groups = () => {

    const {groups} = useSelector(store => store);
    const {authenticated} = useSelector(store => store.settings);
    const {baseURL} = useSelector(store => store.settings);
    const dispatch = useDispatch();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [groupsError, setGroupsError] = useState({ isError: false, errorMsg: ''});

    const navigation = [
        {
            name: 'Группы',
            link: '/groups'
        }
    ]

    useEffect(() => {
        dispatch(updateNavigation(navigation));
        setLoading(true);
        fetch(baseURL + '/groups?_from=0&_to=20', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.error) {
                    setGroupsError({ isError: true, errorMsg: json.error.message })
                } else {
                    const groups = json.data.map((item, index) => {
                        return {
                            id: index + 1,
                            _id: item._id,
                            cover: item.coverID,
                            name: item.name,
                            avatar: item.avatarID,
                            description: item.description,
                            link: item.site,
                            newsTotal: item.total.posts,
                            likesTotal: item.total.likes,
                            news: []
                        }
                    });
                    dispatch(setGroups(groups));
                }
            })
            .catch(error => {
                setLoading(false);
                setGroupsError({ isError: true, errorMsg: error.toString() })
            })
    }, []);

    if (!authenticated) setTimeout(() => history.push('/'), 3000);

    return (
        authenticated ? (
        <div>
            <Navigation />
            { loading ? (
                <div>
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
            <div className={style.panel}>

                <div
                    className={style['big-button']}
                    title="Добавить группу"
                    onClick={() => history.push('/groups/0')}
                >
                    +
                </div>

                <div className={style.groups}>
                    {
                        groups.map((item, index) => <GroupItem key={index} {...item} />)
                    }
                </div>

            </div>)}

            <Title titleText="АДМИНИСТРИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ" />

            <div className={style.panel}>
                <Users />
            </div>

        </div>) : (
            <Alert variant="danger">У вас недостаточно прав для посещения этой страницы. Авторизуйтесь, пожалуйста!</Alert>
        )

    )

}

export default Groups;