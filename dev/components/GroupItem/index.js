import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

import Button from "../Button";
import Icon from "../Icon";

import style from './style.sass';
import useOkCancelModal from "../../hooks/useOkCancelModal";
import {deleteGroup} from "../../actions";

const GroupItem = ( { id, cover, avatar, name, description, link, news } ) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const deleteModal = useOkCancelModal('Внимание!',
        () => (<p>Вы действительно хотите удалить эту группу новостей?</p>),
        () => {
            news.length ? alert('В этой группе есть новости, ее нельзя удалить.') :
                dispatch(deleteGroup(id))
        });

    const coverImage = {
        backgroundImage: `url("${cover}")`
    }

    const avatarImage = {
        backgroundImage: `url("${avatar}")`
    }

    return (
        <div className={style.group__item}>

            <div className={style['group__item-cover']} style={coverImage}>
                <div className={style['group__item-avatar']} style={avatarImage}>
                </div>
            </div>

            <div className={style['group__item-title']}>
                <p>{name}</p>
            </div>

            <hr/>

            <div className={style['group__item-body']}>
                <p>{description}</p>
                <a target="_blank" href={link}>Сайт...</a>
            </div>

            {
                news.length ? (
                    <div className={style.news__ref}>
                        <a href={`/#/groups/${id}/news`}>К новостям группы...</a>
                    </div>
                ) : (
                    <div className={style.empty}>{`<Эта группа пуста>`}</div>
                )
            }

            <div className={style['group__item-footer']}>
                <Button type="small" title="Добавить новость"
                    onClick={() => history.push(`/groups/${id}/news/0`)}
                >
                    <Icon name="plus" />
                </Button>
                <Button type="small" title="Изменить" onClick={() => history.push(`/groups/${id}`)}>
                    <Icon name="edit" />
                </Button>
                <Button type="small" title="Удалить" onClick={deleteModal.show}>
                    <Icon name="delete" />
                </Button>
            </div>

            {deleteModal.render()}

        </div>
    )

}

export default GroupItem