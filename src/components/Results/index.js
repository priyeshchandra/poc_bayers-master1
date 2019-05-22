import React from "react";
import Output from "./output";
import { connect } from "react-redux";
import "./index.css";

class Results extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			checkedId: null,
			folders:[]
		};
	}
	handleChange = e => {
		this.setState({
			name: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.addUserFolders(1,[...this.state.folders, ])
	};
	checkedFolder = (val, folders) => {
		this.setState({
			checkedId: val,
			folders
		});
	};
	render() {
		return (
			<div className="results-container">
				<div className="results-search_wrapper">
					<div className="header-1 results_header">Private</div>
					<div className="header-4 results_subheader">
						Save your searches in private area or choose/create
						another folder
					</div>
					<div className="results-searchfield_wrapper">
						<form onSubmit={this.handleSubmit}>
							<div className="results-search_bold">
								SEARCH NAME
							</div>
							<div className="field">
								<div className="control">
									<input
										className="input is-danger"
										type="text"
										placeholder="e.g. Population with Disease"
										onChange={this.handleChange}
									/>
								</div>
								<div className="results-buttons_wrapper">
									<a className="button is-danger custom_padding white">
										Save
									</a>
									<a className="button is-danger is-outlined bg-white custom_padding">
										Cancel
									</a>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="results-search_results">
					<Output checkedFolder={this.checkedFolder} />
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	dispatch => ({
		addUserFolders(id, folders) {
			return dispatch(addUserFolders(id, folders));
		}
	})
)(Results);
