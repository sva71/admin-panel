import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router";

import style from '../GroupItem/style.sass';
import Button from "../Button";
import Icon from "../Icon";

import useOkCancelModal from "../../hooks/useOkCancelModal";
import {deleteNews} from "../../actions";

const NewsItem = ({id, _id, groupId, titleID, content}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {baseURL} = useSelector(store => store.settings);
    const brief = (content.length > 100) ? content.slice(0, 100) +  '...' : content;

    const deleteModal = useOkCancelModal('Внимание!',
        () => (<p>Вы действительно хотите удалить эту новость?</p>),
        () => {
            const delPromise = () => fetch(baseURL + '/posts/' + _id + '/',{
                method: 'DELETE',
                credentials: 'include'
                }).then(response => response.json());
            delPromise().then(json => json.error || dispatch(deleteNews(id)))
            });

    const imageBgr = { backgroundImage: `url("${baseURL}/s/files/${titleID}/")` }

    return (
        <div className={style.group__item}>

            <div className={style['group__item-cover']} style={imageBgr} />

            <div className={style['group__item-body']}>
                <p>{brief}</p>
            </div>

            <div className={style['group__item-footer']}>
                <Button type="small" title="Изменить"
                        onClick={() => history.push(`/groups/${groupId}/news/${id}`)}>
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

export default NewsItem;