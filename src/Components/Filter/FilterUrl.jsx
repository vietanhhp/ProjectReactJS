import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Seach from "./Seach";
import FilterCategory from "./FilterCategory";

FilterUrl.propTypes = {};

function FilterUrl(props) {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <Switch>
      <Route exact path={match.url} component={FilterUrl}></Route>

      <Route
        path={`${match.url}/tim-kiem/:searchTerm`}
        component={Seach}
      ></Route>
      <Route
        path={`${match.url}/:categoryCode`}
        component={FilterCategory}
      ></Route>
    </Switch>
  );
}

export default FilterUrl;
