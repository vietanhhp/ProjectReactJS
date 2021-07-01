import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';

function UserUrl(props) {
    const match = useRouteMatch();
    console.log({ match });

    return (
        <div>
            <Switch>
                <Route exact path={match.url} component={UserInfo}></Route>

                <Route path={`${match.url}/sua-thong-tin`} component={UserEdit}></Route>
            </Switch>
        </div>
    );
}

export default UserUrl;