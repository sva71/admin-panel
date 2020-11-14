import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

import style from './style.sass';

const Navigation = () => {
    const {navigation} = useSelector(state => state);
    return (
        <div className={style.navigation}>
            {navigation.map((item, index) => <Link to={item.link} key={index}> {item.name} ></Link>)}
        </div>
        )
}

export default Navigation;