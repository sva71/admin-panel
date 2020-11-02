// const groups = [
//     {
//         id: 1,
//         _id: '',
//         cover: '85baccad-d19d-46ae-95ae-70fa2e12e49d',
//         name: 'Британские коты',
//         avatar: 'cb8f9a01-fef8-4d2c-968e-4bd082910d8c',
//         description: 'Все о британских котах - кормление, лечение, уход.',
//         link: 'https://elite-british.by',
//         newsTotal: 1,
//         likesTotal: 0,
//         news: [{
//             id: 1,
//             image: 'https://www.zastavki.com/pictures/640x480/2013/Animals___Cats_British_Shorthair_cat_044322_29.jpg',
//             body: 'Великолепие британской породы кошек в её уникальности, плотная плюшевая набитая шерсть, крепкий мощный костяк с небольшими лапками, недлинный толстый хвост, закругленные ушки.'
//         }]
//     },
//     {
//         id: 2,
//         _id: '',
//         cover: 'https://malteze.net/images/sampledata/poroda/2015/2fb_1645473837565.jpg',
//         name: 'Французские бульдоги',
//         avatar: 'https://img.point.pet/images/38502228_1197879110354651_4351825821116137472_n-5b74d935c9e77c0050dbbe5f.jpg',
//         description: 'Все о французских бульдогах - кормление, лечение, уход.',
//         link: 'http://frenchbulldog.ru',
//         newsTotal: 0,
//         likesTotal: 0,
//         news: []
//     },
//     {
//         id: 3,
//         _id: '',
//         cover: 'https://picua.org/images/2020/10/19/6b13e46f246a3b558607827ae22be508.jpg',
//         name: 'Волнистые попугайчики',
//         avatar: 'https://picua.org/images/2020/10/19/0c27ca86cb441adcbf5846ccf8289e2d.jpg',
//         description: 'Все о содержании волнистых попугайчиков - кормим, ухаживаем, учим говорить.',
//         link: 'https://www.pig333.ru',
//         newsTotal: 0,
//         likesTotal: 0,
//         news: []
//     }
// ];

const groups=[];

const groupsReducer = (state = groups, action) => {

    const {payload} = action;

    switch(action.type) {
        case 'SET_GROUPS': return payload
        case 'ADD_GROUP': {
            return [
                ...state,
                payload
            ]
        }
        case 'UPDATE_GROUP': {
            return state.map((item) => item.id === payload.id ? payload : item)
        }
        case 'DELETE_GROUP': return state.filter(({id}) => id !== payload)
        default:
            return state
    }

}

export default groupsReducer;