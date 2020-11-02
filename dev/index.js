import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {HashRouter as Router} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import store from './store';
import App from "./components/App";
import Title from "./components/Title";
import Groups from './components/Groups';
import GroupEdit from "./components/GroupEdit";
import News from './components/News';
import NewsEdit from "./components/NewsEdit";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Title titleText="АДМИНИСТРИРОВАНИЕ НОВОСТЕЙ" />
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/groups' exact component={Groups} />
                <Route path='/groups/:groupId' exact component={GroupEdit} />
                <Route path='/groups/:groupId/news' exact component={News} />
                <Route path='/groups/:groupId/news/:newsId' exact component={NewsEdit} />
                <Route path="*" render={() => (
                    <Alert show variant="danger">
                        Запрашиваемая Вами страница не найдена!
                    </Alert> )
                } />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);
