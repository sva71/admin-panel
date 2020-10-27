import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router";
import Alert from 'react-bootstrap/Alert';

import GroupItem from '../GroupItem';
import Title from "../Title";
import Users from '../Users';
import Navigation from "../Navigation";

import style from './style.sass';
import {updateNavigation} from "../../actions";

const Groups = () => {

    const {groups} = useSelector(store => store);
    const {authenticated} = useSelector(store => store.settings);
    const dispatch = useDispatch();
    const history = useHistory();

    const navigation = [
        {
            name: 'Группы',
            link: '/#'
        }
    ]

    useEffect(() => {dispatch(updateNavigation(navigation))}, []);

    if (!authenticated) setTimeout(() => history.push('/'), 3000);

    return (
        authenticated ? (
        <div>
            <Navigation />
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

            </div>

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