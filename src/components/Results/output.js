import React from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import CreateFolder from "./CreateFolder";
import { addUserFolders } from "../../actions";
import "./index.css";

class Output extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			folders: [],
			showFolder: false,
			folder: {
				name: "",
				created: "",
				updated: ""
			},
			checkedId: null
		};
	}
	componentDidMount() {
		axios.get("http://localhost:3004/users/1").then(res => {
			this.setState({
				folders: res.data.folders
			});
		});
	}
	createFolder = () => {
		this.setState({
			showFolder: true
		});
	};
	hideFolder = name => {
		this.setState(
			{
				showFolder: false,
				folders: [
					...this.state.folders,
					{
						id: this.state.folders.length + 1,
						name,
						created: moment(Date.now()).format("ll"),
						updated: moment(Date.now()).format("ll")
					}
				]
			},
			() => {
				this.props.addUserFolders(1, this.state.folders);
			}
		);
	};
	handleCheckbox = e => {
		this.setState({ checkedId: e.target.name }, () => {
			this.props.checkedFolder(this.state.checkedId, this.state.folders);
		});
	};
	renderFolders = () => {
		if (this.state.folders.length > 0 || this.state.showFolder) {
			return this.state.folders.map(folder => (
				<div className="output_folder--grid" key={folder.id}>
					<div>
						<label className="checkbox">
							<input
								type="checkbox"
								name={folder.id}
								onChange={this.handleCheckbox}
							/>
						</label>
					</div>
					<div>
						<i className="far fa-folder" /> &nbsp;{folder.name}
					</div>
					<div>{folder.created}</div>
					<div>{folder.updated}</div>
					<div className=" output_deleteicons">
						<div className="icon--custom-style">
							<i className="fas fa-save pink" />
						</div>
						<div className="icon--custom-style">
							<i className="fas fa-trash pink" />
						</div>
					</div>
				</div>
			));
		}
		return (
			<div className="output--noFolder margin-bm-10">
				No folders exits.Please go head and create
			</div>
		);
	};
	render() {
		return (
			<div>
				<div className="output-search_results_header">
					<div className="header-1 results_header">
						/ &nbsp; Private
					</div>
					<a
						className="button is-danger is-outlined results-custom_upper"
						onClick={this.createFolder}
					>
						<i className="fas fa-folder-plus pink" />
						<span>New folder</span>
					</a>
				</div>
				<div className="output_folders">
					<div className="output_folder--grid">
						<div />
						<div>
							Name &nbsp;&nbsp;
							<i className="fas fa-sort-down" />
						</div>
						<div>
							Created &nbsp;&nbsp;
							<i className="fas fa-sort-down" />
						</div>
						<div>
							Updated &nbsp;&nbsp;
							<i className="fas fa-sort-down" />
						</div>
						<div />
					</div>
					{this.renderFolders()}
					{this.state.showFolder && (
						<div className="output_folder--grid">
							<div>
								<label className="checkbox">
									<input type="checkbox" />
								</label>
							</div>
							<div>
								{" "}
								<CreateFolder hideFolder={this.hideFolder} />
							</div>
							<div>null</div>
							<div>null</div>
							<div>delete icons</div>
						</div>
					)}
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
)(Output);
