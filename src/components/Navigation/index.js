import React from "react";
import "./index.css";

export default () => (
	<div className="tabs is-centered navigation-tabs">
		<ul>
			<li className="is-active">
				<a>
					<span>Private</span>
				</a>
			</li>
			<li>
				<a>
					<span>Shared</span>
				</a>
			</li>
			<li>
				<a>
					<span>PSUR</span>
				</a>
			</li>
			<li>
				<a>
					<span>Push</span>
				</a>
			</li>
		</ul>
	</div>
);
