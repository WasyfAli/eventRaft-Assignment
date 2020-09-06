import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Tag from "./core/Tag";
import GetRelationship from "./core/Relationship";
import AddRelation from "./core/AddRelation";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tag" exact component={Tag} />
        <Route path="/addRelations" exact component={AddRelation} />
        <Route path="/getRelations" exact component={GetRelationship} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
