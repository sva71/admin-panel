import React from 'react';
import {useSelector} from 'react-redux';

import style from './style.sass';

const Navigation = () => {
    const {navigation} = useSelector(state => state);
    return (
        <div className={style.navigation}>
            {navigation.map((item, index) => <a href={item.link} key={index}> {item.name} ></a>)}
        </div>
        )
}

export default Navigation;