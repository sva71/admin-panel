const groups = [
    {
        id: 1,
        cover: 'https://gala-cat.ru/_nw/0/15180921.jpg',
        name: 'Британские коты',
        avatar: 'http://udivitelno.com/images/10/britanskaya-korotkosherstnaya-koshka/27-%D0%A0%D0%BE%D1%81%D0%BA%D0%BE%D1%88%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%BE%D1%88%D0%BA%D0%B0%20%D0%BF%D0%BE%D1%80%D0%BE%D0%B4%D1%8B%20%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%BE%D1%88%D0%B5%D1%80%D1%81%D1%82%D0%BD%D0%B0%D1%8F.jpg',
        description: 'Все о британских котах - кормление, лечение, уход.',
        link: 'https://elite-british.by',
        news: [{
            id: 1,
            image: 'https://www.zastavki.com/pictures/640x480/2013/Animals___Cats_British_Shorthair_cat_044322_29.jpg',
            body: 'Великолепие британской породы кошек в её уникальности, плотная плюшевая набитая шерсть, крепкий мощный костяк с небольшими лапками, недлинный толстый хвост, закругленные ушки.'
        }]
    },
    {
        id: 2,
        cover: 'https://malteze.net/images/sampledata/poroda/2015/2fb_1645473837565.jpg',
        name: 'Французские бульдоги',
        avatar: 'https://img.point.pet/images/38502228_1197879110354651_4351825821116137472_n-5b74d935c9e77c0050dbbe5f.jpg',
        description: 'Все о французских бульдогах - кормление, лечение, уход.',
        link: 'http://frenchbulldog.ru',
        news: []
    },
    {
        id: 3,
        cover: 'https://picua.org/images/2020/10/19/6b13e46f246a3b558607827ae22be508.jpg',
        name: 'Волнистые попугайчики',
        avatar: 'https://picua.org/images/2020/10/19/0c27ca86cb441adcbf5846ccf8289e2d.jpg',
        description: 'Все о содержании волнистых попугайчиков - кормим, ухаживаем, учим говорить.',
        link: 'https://www.pig333.ru',
        news: []
    }
];

const groupsReducer = (state = groups, action) => {

    const {payload} = action;

    switch(action.type) {
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