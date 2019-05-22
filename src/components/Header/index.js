import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default () => (
	<nav
		className="navbar header-navbar"
		role="navigation"
		aria-label="main navigation"
	>
		<div className="navbar-brand header-navbar-brand container">
			<Link className="navbar-item" to="/">
				Autozone
			</Link>
		</div>
	</nav>
);
