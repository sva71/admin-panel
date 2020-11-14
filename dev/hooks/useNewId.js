import React from 'react';
import {useSelector} from 'react-redux';

export default function useNewId() {
    const groups = useSelector(store => store.groups);
    if (groups.length) {
        const id = groups[groups.length - 1].id;
        return id + 1;
    } else return 1;
}