import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router";

import style from '../GroupItem/style.sass';
import Button from "../Button";
import Icon from "../Icon";
import useOkCancelModal from "../../hooks/useOkCancelModal";
import {updateGroup} from "../../actions";

const NewsItem = ({id, image, body, gId}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const group = useSelector(store => store.groups[gId - 1]);
    const {news} = useSelector(store => store.groups[gId - 1]);
    const brief = (body.length > 100) ? body.slice(0, 100) +  '...' : body.slice(0, 100);

    const deleteModal = useOkCancelModal('Внимание!',
        () => (<p>Вы действительно хотите удалить эту новость?</p>),
        () => {
            dispatch(updateGroup({
                ...group,
                news: news.filter((item) => item.id !== id)
            }))
        });

    const imageBgr = {
        backgroundImage: `url("${image}")`
    }

    return (
        <div className={style.group__item}>

            <div className={style['group__item-cover']} style={imageBgr}></div>

            <div className={style['group__item-body']}>
                <p>{brief}</p>
            </div>

            <div className={style['group__item-footer']}>
                <Button type="small" title="Изменить"
                        onClick={() => history.push(`/groups/${gId}/news/${id}`)}>
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