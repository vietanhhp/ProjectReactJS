import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import NewsDetail from './NewsDetail';
import NewsAll from './NewsAll';

News.propTypes = {

};

function News(props) {
    const match = useRouteMatch();
    console.log({ match });
    return (
        <Switch>
            <Route exact path={match.url} component={NewsAll}></Route>

            <Route path={`${match.url}/:postId`} component={NewsDetail}></Route>
        </Switch>
    );
}

export default News;