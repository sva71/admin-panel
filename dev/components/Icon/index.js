import React from 'react';

import Edit from './Icons/edit.svg';
import Delete from './Icons/delete.svg';
import Plus from './Icons/plus.svg';

const Icon = ({name}) => {
    switch (name) {
        case 'edit': return <Edit />;
        case 'delete': return <Delete />;
        case 'plus': return <Plus />
        default: return <div />
    }
};

export default Icon;