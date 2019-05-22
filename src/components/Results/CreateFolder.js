import React from "react";

export default class CreateFolder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}
	handleChange = e => {
		this.setState({ name: e.target.value });
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.hideFolder(this.state.name);
	};
	render() {
		return (
			<div className="CreateFolder">
				<form onSubmit={this.handleSubmit}>
					<div className="field">
						<div className="control">
							<input
								className="input is-danger"
								type="text"
								placeholder="Folder name"
								onChange={this.handleChange}
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
