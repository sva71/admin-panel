import React from 'react';

import style from './style.sass';

const Title = ({titleText}) => (
    <div className={style.title}>
        <p>{titleText}</p>
    </div>
)

export default Title;