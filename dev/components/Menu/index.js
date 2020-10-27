import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router'

import style from './style.sass';

const Menu = ({title, addr}) => {

    const history = useHistory();
    console.log(addr);

    return (
        <div className={style.menu}>
            <div
                className={style['big-button']}
                title={title}
                onClick={() => history.push({addr})}
            >
                +
            </div>
        </div>
    );

}

export default Menu;