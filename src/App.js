import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/SavedSearch";
import History from "./components/History";

export default () => (
	<BrowserRouter>
		<Header />
		<div className="container">
			<Switch>
				<Route path="/search" component={Search} />
				<Route exact path="/" component={History} />
			</Switch>
		</div>
	</BrowserRouter>
);
